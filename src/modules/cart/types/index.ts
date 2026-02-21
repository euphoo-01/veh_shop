import type { Product } from "@/modules/vehicle/types";

export type CartItem = Product & { quantity: number };
