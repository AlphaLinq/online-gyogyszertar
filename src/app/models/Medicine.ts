export interface Medicine {
  id: string;
  name: string;
  price: number;
  description: string;
  imgURL: string;
  type: string;
  quantity?: number;
}
