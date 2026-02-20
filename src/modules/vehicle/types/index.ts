import { NetworkError } from "@/modules/shared/services/networker";

export type GroupFilter = "cars" | "motorcycles";
export type PriceFilter = "asc" | "desc";

export interface Car {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  sku: `${string}-${string}-${string}-${string}-${string}`;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<Review>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: Array<ImageURL>;
  thumbnail: ImageURL;
}

export interface Motorcycle extends Car {}

export interface Product extends Car, Motorcycle {}

export type ProductPreview<T extends Product> = Pick<T, "title" | "brand" | "price" | "thumbnail">;

export interface Review {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: `${string}@${string}.${string}`;
}

export type ProductsAPIResponse<T extends Product | ProductPreview<Product>> =
  | {
      products: T[];
      limit: number;
      total: number;
      skip: number;
    }
  | NetworkError;

export type ImageURL = `httpps://${string}.webp`;
