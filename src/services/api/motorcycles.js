export const getMotorcyclesPreview = (networker, limit = 20, skip = 0) => {
  return networker.get(
    `products/category/motorcycle?limit=${limit}&skip=${skip}&select=title,price,thumbnail`,
  );
};
