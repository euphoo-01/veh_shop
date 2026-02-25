import type { QuotesAPIResponse } from "../types";
import { Networker, NetworkError } from "@/modules/shared/services/networker";

export const getReviews = async (networker: Networker, quantity = 3) => {
  const response = await networker.get<QuotesAPIResponse | NetworkError>(
    `quotes?limit=${quantity}`,
  );
  if (response instanceof Error) {
    return response;
  }
  return response.quotes;
};
