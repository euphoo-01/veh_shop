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

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
  phone: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends User, AuthTokens {}
