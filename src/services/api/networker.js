const domainURL = 'https://dummyjson.com';

export class Networker {
  #domain;
  constructor(domain = domainURL) {
    this.#domain = domain;
  }

  async get(endpoint, options = {}) {
    try {
      const result = await fetch(`${this.#domain}/${endpoint}`, { method: 'GET', ...options });
      return result.json();
    } catch (e) {
      console.error(`Не удалось получить данные с эндпоинта: ${endpoint}`, e.message);
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
      return result.json() || {};
    } catch (e) {
      console.error(`Не удалось отправить данные на эндпоинт: ${endpoint}`, e.message);
    }
  }
}
