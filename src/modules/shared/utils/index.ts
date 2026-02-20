import { NetworkError } from "../services/networker";

export const isNotNetworkError = <T>(value: T | NetworkError): value is T => {
  return !(value instanceof NetworkError);
};
