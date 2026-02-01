export const getReviews = (networker, quantity = 3) => {
  return networker.get(`quotes?limit=${quantity}`);
};
