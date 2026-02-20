import type { Networker, NetworkError } from "@/modules/shared/services/networker";
import type { ProductsAPIResponse, Car, Motorcycle, ProductPreview, Product } from "../types";

export const getVehiclesPreview = async (
  networker: Networker,
  limit = 20,
  skip = 0,
): Promise<ProductPreview<Car>[] | NetworkError> => {
  const response = await networker.get<ProductsAPIResponse<ProductPreview<Car>>>(
    `products/category/vehicle?limit=${limit}&skip=${skip}&select=title,brand,price,thumbnail`,
  );
  if (response instanceof Error) {
    return response;
  }
  return response.products;
};

export const getMotorcyclesPreview = async (
  networker: Networker,
  limit = 20,
  skip = 0,
): Promise<ProductPreview<Motorcycle>[] | NetworkError> => {
  const response = await networker.get<ProductsAPIResponse<ProductPreview<Motorcycle>>>(
    `products/category/motorcycle?limit=${limit}&skip=${skip}&select=title,price,brand,thumbnail`,
  );
  if (response instanceof Error) {
    return response;
  }
  return response.products;
};

export const getVehicleById = async (
  networker: Networker,
  id: number,
): Promise<Product | NetworkError> => {
  const response = await networker.get<Product>(`products/${id}`);
  if (response instanceof Error) {
    return response;
  }
  return response;
};
