export class Server {
  #networker;
  constructor(networker) {
    this.#networker = networker;
  }

  getVehicles() {
    return this.#networker.get('products/category/vehicles');
  }
  getMotorcycles() {
    return this.#networker.get('products/category/motorcycles');
  }
}
