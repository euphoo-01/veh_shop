import { NetworkError } from "@/modules/shared/services/networker";

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export type QuotesAPIResponse =
  | {
      quotes: Array<Quote>;
      total: number;
      skip: number;
      limit: number;
    }
  | NetworkError;
