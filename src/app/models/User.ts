import { Medicine } from './Medicine';

export interface User {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  cart: { [medicineId: string]: number };
}
