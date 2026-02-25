import type { User } from "@/modules/user/types";

export interface NavigationMenuProps {
  username: User["username"];
  isAuthorized: boolean;
  totalProducts: number;
  isMobile: boolean;
}
