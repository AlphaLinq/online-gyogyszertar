import { Medicine } from './Medicine';
import { User } from './User';

export interface Order {
  id: number;
  items: Medicine[];
  buyer: User;
}
