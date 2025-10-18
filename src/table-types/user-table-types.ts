interface State {
  id: number;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  alternative_phone_number: string | null;
  address: string | null;
  address_proof: string | null;
  id_proof: string | null;
  location: string | null;
  location_id: number | null;
  city: string | null;
  city_id: number | null;
  district: string | null;
  district_id: number | null;
  pin_code: string | null;
  pin_code_id: number | null;
  role: string;
  is_active: 0 | 1;
  is_approved: 0 | 1;
  sales_unique_id: string;
  referred_by_sales_user_id: number | null;
  state_id: number;
  state: State;
  created_at: string;
}
