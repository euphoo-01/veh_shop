import type { Networker } from "@/modules/shared/services/networker";
import type { AuthResponse, User } from "@/modules/user/types";

export const getUserData = (networker: Networker) => {
  return networker.get<User>("auth/me");
};

export const loginUser = (networker: Networker, username: string, password: string) => {
  return networker.post<AuthResponse>("auth/login", { username, password });
};
