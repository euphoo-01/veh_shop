export const getVehiclesPreview = (networker, limit = 20, skip = 0) => {
  return networker.get(
    `products/category/vehicle?limit=${limit}&skip=${skip}&select=title,brand,price,thumbnail`,
  );
};

export const getMotorcyclesPreview = (networker, limit = 20, skip = 0) => {
  return networker.get(
    `products/category/motorcycle?limit=${limit}&skip=${skip}&select=title,price,brand,thumbnail`,
  );
};

export const getVehicleById = (networker, id) => {
  return networker.get(`products/${id}`);
};
