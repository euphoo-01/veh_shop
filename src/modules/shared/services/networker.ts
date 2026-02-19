export const enum RequestType {
  POST = "POST",
  GET = "GET",
}

export class NetworkError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "NetworkError";
  }
}

export interface AuthHandlers {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  onSessionRefreshed: (accessToken: string, refreshToken: string) => void;
  onSessionExpired: () => void;
}

export class Networker {
  private domain: string;
  private authHandlers: AuthHandlers | null = null;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(domain: string) {
    this.domain = domain;
  }

  public setAuthHandlers(handlers: AuthHandlers): void {
    this.authHandlers = handlers;
  }

  private async refreshTokens(): Promise<boolean> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    if (!this.authHandlers) {
      return false;
    }

    const handlers = this.authHandlers;
    const refreshToken = handlers.getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${this.domain}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.accessToken && data.refreshToken) {
            handlers.onSessionRefreshed(data.accessToken, data.refreshToken);
            return true;
          }
        }

        handlers.onSessionExpired();
        return false;
      } catch (error) {
        console.error("Failed to refresh token", error);
        handlers.onSessionExpired();
        return false;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private async sendRequest<T>(
    endpoint: string,
    method: RequestType,
    data?: object,
    options: RequestInit = {},
    isRetry: boolean = false,
  ): Promise<T | NetworkError> {
    try {
      const url = `${this.domain}/${endpoint}`;

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
      };

      if (this.authHandlers) {
        const token = this.authHandlers.getAccessToken();
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const config: RequestInit = {
        ...options,
        method,
        headers,
      };

      if (data) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);

      if (response.status === 401 && !isRetry && this.authHandlers) {
        const refreshed = await this.refreshTokens();
        if (refreshed) {
          return this.sendRequest<T>(endpoint, method, data, options, true);
        } else {
          return new NetworkError("Unauthorized", 401);
        }
      }

      if (!response.ok) {
        throw new NetworkError(`HTTP Error: ${response.statusText}`, response.status);
      }

      const json = await response.json();
      return json as T;
    } catch (e) {
      if (e instanceof NetworkError) {
        return e;
      } else if (e instanceof Error) {
        return new NetworkError(e.message, 500);
      } else {
        return new NetworkError("Unknown error", 500);
      }
    }
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T | NetworkError> {
    return this.sendRequest<T>(endpoint, RequestType.GET, undefined, options);
  }

  async post<T>(
    endpoint: string,
    data: object,
    options: RequestInit = {},
  ): Promise<T | NetworkError> {
    return this.sendRequest<T>(endpoint, RequestType.POST, data, options);
  }
}

const domainURL = "https://dummyjson.com";
export const networker = new Networker(domainURL);
