export interface User {
  userId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  offers: unknown[];
  wishlist: unknown[];
}
