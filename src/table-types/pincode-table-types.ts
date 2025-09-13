export type Pincode = {
    id: string,
    location_id: string,
    area_name: string | null,
    status: string,
    pin_code: string,
    fallback_pin_codes: string[] | null,
}