export class Networker {
  #domain;
  #refreshCallback;
  #refreshingTokens = null; // чтобы не было гонки
  constructor(domain) {
    this.#domain = domain;
  }

  setRefreshCallback(callback) {
    this.#refreshCallback = callback;
  }

  async get(endpoint, options = {}) {
    try {
      const result = await fetch(`${this.#domain}/${endpoint}`, {
        method: 'GET',
        ...options,
      });

      if (result.status === 401 && !endpoint.includes('/auth/refresh')) {
        if (this.#refreshTokens() === true) {
          return this.get(endpoint, options);
        }
        const error = new Error('Unauthorized');
        error.status = 401;
        throw error;
      }

      if (result.status >= 400) {
        const error = new Error(
          `HTTP: ${result.status}. Couldn't get data from the endpoint: ${endpoint}`,
        );
        error.status = result.status;
        throw error;
      }
      return result.json() || {};
    } catch (e) {
      console.error(`Произошла ошибка:`, e.message);
      return e;
    }
  }
  async post(endpoint, data, options = {}) {
    try {
      const result = await fetch(`${this.#domain}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options,
      });

      if (
        result.status === 401 &&
        !endpoint.includes('/auth/login') &&
        !endpoint.includes('/auth/refresh')
      ) {
        if (this.#refreshTokens() === true) {
          return this.post(endpoint, data, options);
        }
        const error = new Error('Unauthorized');
        error.status = 401;
        throw error;
      }

      if (result.status >= 400) {
        const error = new Error(
          `HTTP: ${result.status}. Couldn't send data to the endpoint: ${endpoint}`,
        );
        error.status = result.status;
        throw error;
      }
      return result.json() || {};
    } catch (e) {
      console.error(`There is an error:`, e.message);
      return e;
    }
  }

  async #refreshTokens() {
    if (this.#refreshingTokens) {
      await this.#refreshingTokens;
      return true;
    }

    if (!this.#refreshCallback) {
      throw new Error('Refresh callback not setted!');
    }

    this.#refreshingTokens = this.#refreshCallback();

    try {
      await this.#refreshingTokens;
      return true;
    } catch (error) {
      return false;
    } finally {
      this.#refreshingTokens = null;
    }
  }
}
