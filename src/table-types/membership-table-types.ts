export interface Membership {
  id: number;
  member: number; 
  membership_id: number;
  membership?: {
    id: number;
    name: string;
    description: string;
    price: string;
    discounted_price?: string;
    discounted_percentage?: number;
  };
  sub_category_id: number;
  sub_category?: {
    id: number;
    name: string;
    description?: string;
  };
  quantity: number;
  price: string;
  total_price: string;
  notes?: string | null;
  status: string;
  payment_method: string;
  purchased_at: string;
  created_at: string;
  expires_at: string;
  updated_at: string;
  is_membership_approved?: boolean;
  commission_amount?: string;
    user: {
    name: string;
    email: string;
    phone: string;
  };
}
