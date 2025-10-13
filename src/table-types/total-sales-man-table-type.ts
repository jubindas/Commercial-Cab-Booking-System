export type TotalSalesMan = {
  id: number
  name: string;
  email: string;
  phone: string | null;
  alternative_phone_number: string | null;
  password: string;
  password_confirmation: string;
  role: string;
  address: string | null;
  id_proof: File | null;
  address_proof: File | null;
  state_id: number | null;
  district_id: number | null;
  city_id: number | null;
  location_id: number | null;
  pin_code_id: number | null;
};
