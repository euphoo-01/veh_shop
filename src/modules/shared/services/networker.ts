const enum RequestType {
    POST = "POST",
    GET = "GET",
}

class NetworkError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = "NetworkError";
    }
}

export class Networker {
    private domain: string;
    private refreshCallback: () => Promise<boolean> | null = () => null;
    private refreshTokensPromise: Promise<boolean> | null = null; // чтобы не было гонки
    constructor(domain: string) {
        this.domain = domain;
    }

    private async sendRequest<T>(
        endpoint: string,
        method: RequestType,
        options: Partial<RequestInit>,
        isRefresh: boolean = false,
    ): Promise<T | NetworkError> {
        try {
            const response = await fetch(`${this.domain}/${endpoint}`, {
                method,
                ...options,
            });

            if (!response.ok && !isRefresh) {
                throw new NetworkError(`HTTP Error. ${response?.statusText}`, response.status);
            }
            if (!response.ok && !isRefresh && response.status === 401) {
                if ((await this.refreshTokens()) === true) {
                    return this.sendRequest<T>(endpoint, method, options);
                }
                throw new NetworkError("Unauthorized", 401);
            }

            const json = (await response.json()) || {};
            return json;
        } catch (e) {
            if (e instanceof NetworkError) {
                console.error("There is an error: ", e.message);
                return e;
            } else if (e instanceof Error) {
                console.error("There is an error: ", e.message);
                return { name: "Unknown", message: e.message, status: 1 };
            } else {
                return { name: "Unknown", message: "Unknown", status: 1 };
            }
        }
    }

    async get<T>(
        endpoint: string,
        isRefresh: boolean = false,
        options = {},
    ): Promise<T | NetworkError> {
        const response = await this.sendRequest<T>(endpoint, RequestType.GET, options, isRefresh);
        return response;
    }
    async post<T>(
        endpoint: string,
        data: object,
        isRefresh: boolean = false,
        options = {},
    ): Promise<T | NetworkError> {
        const response = await this.sendRequest<T>(endpoint, RequestType.POST, options, isRefresh);
        return response;
    }

    private async refreshTokens(): Promise<boolean> {
        if (this.refreshTokensPromise) {
            await this.refreshTokensPromise;
            return true;
        }

        if (!this.refreshCallback) {
            throw new Error("Refresh callback not setted!");
        }

        this.refreshTokensPromise = this.refreshCallback();

        try {
            await this.refreshTokensPromise;
            return true;
        } catch {
            return false;
        } finally {
            this.refreshTokensPromise = null;
        }
    }
}

const domainURL = "https://dummyjson.com";
export const networker = new Networker(domainURL);
