const domainURL = 'https://dummyjson.com';

export class Networker {
  #domain;
  constructor(domain = domainURL) {
    this.#domain = domain;
  }

  async get(endpoint, options = {}) {
    try {
      const result = await fetch(`${this.#domain}/${endpoint}`, {
        method: 'GET',
        ...options,
      });

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
      if (result.status >= 400) {
        const error = new Error(
          `HTTP: ${result.status}. Couldn't send data to the endpoint: ${endpoint}`,
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
}
