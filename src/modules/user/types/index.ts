export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  address: Address;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends User, AuthTokens {}
