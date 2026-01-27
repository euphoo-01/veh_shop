export const getVehiclesPreview = (networker, limit = 20, skip = 0) => {
  return networker.get(
    `products/category/vehicle?limit=${limit}&skip=${skip}&select=title,price,images`,
  );
};
