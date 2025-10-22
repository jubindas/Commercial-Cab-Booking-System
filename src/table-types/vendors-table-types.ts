interface State {
  id: number;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface District {
  id: number;
  state_id: number;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface City {
  id: number;
  district_id: number;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Location {
  id: number;
  city_id: number;
  name: string;
  latitude: string;
  longitude: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PinCode {
  id: number;
  location_id: number;
  pin_code: string;
  area_name: string;
  fallback_pin_codes: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  category: Category;
}

interface Membership {
  id: number;
  sub_category_id: number;
  name: string;
  description: string;
  price: string;
  discounted_price: string;
  discounted_percentage: number;
  quantity: number;
  member: number;
  created_at: string;
  updated_at: string;
  sub_category: SubCategory;
}

interface MembershipHistory {
  id: number;
  user_id: number;
  membership_id: number;
  quantity: number;
  member: number;
  price: string;
  total_price: string;
  purchased_at: string;
  expires_at: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  membership: Membership;
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  alternative_phone_number: string | null;
  role: string;
  address: string;
  state_id: number;
  district_id: number;
  city_id: number;
  location_id: number;
  pin_code_id: number;
  id_proof: string | null;
  address_proof: string | null;
  created_at: string;
  updated_at: string;
  state: State;
  district: District;
  city: City;
  location: Location;
  pin_code: PinCode;
  membership_histories: MembershipHistory[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: any;
}
