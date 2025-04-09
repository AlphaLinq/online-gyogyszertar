import { Medicine } from './Medicine';

export interface User {
  id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  cart: Medicine[];
}
