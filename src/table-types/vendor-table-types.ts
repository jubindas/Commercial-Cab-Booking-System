export type Vendor = {
  id: string; 
  name: string;
  email: string;
  phone: string;
  alternative_phone_number: string | null;
  address: string;
  address_proof: string | null;
  id_proof: string | null;
  city_id: string;
  district_id: string;
  state_id: string;
  location_id: string;
  pin_code_id: string;
  current_membership_id: string | null;
};
