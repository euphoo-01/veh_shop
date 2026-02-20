import type { QuotesAPIResponse } from "../types";
import { Networker } from "@/modules/shared/services/networker";

export const getReviews = async (networker: Networker, quantity = 3) => {
  const response = await networker.get<QuotesAPIResponse>(`quotes?limit=${quantity}`);
  if (response instanceof Error) {
    return response;
  }
  return response.quotes;
};
