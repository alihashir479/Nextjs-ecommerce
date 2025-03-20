type Rating = {
  rate: number;
  count: number;  
}
export type ProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  rating: Rating;
}