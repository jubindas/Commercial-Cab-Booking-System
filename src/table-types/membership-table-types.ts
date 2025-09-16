export interface Membership {
  id: number;
  name: string;
  description: string;
  price: number;
  discounted_price?: number;
  discounted_percentage?: number;
  sub_category_id: number;
  sub_category?: {
    id: number;
    name: string;
  };
}
