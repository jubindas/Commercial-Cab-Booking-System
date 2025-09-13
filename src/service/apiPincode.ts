import { API_BASE_URL } from "@/lib/db";

import axios from "axios";

export async function getPincode() {
  try {
    const response = await axios.get(`${API_BASE_URL}/pin-codes`);

    if (response && response.status === 200) {
      return response.data.data;
    } else {
      console.log("Unexpected response:", response);
      return [];
    }
  } catch (error) {
    console.error("The error is:", error);
    return [];
  }
}


export async function createPincode(pinCode: {
  location_id: string;
  area_name?: string;
  pin_code: string;
  fallback_pin_codes?: string[];
}) {
  try {
    console.log("Sending data:", pinCode);
    const response = await axios.post(`${API_BASE_URL}/pin-codes`, pinCode);
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("the err is", error.response?.data || error);
    throw error;
  }
}



export async function deletePincode(id: string) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/pin-codes/${id}`);

    if (response.status === 200 || response.status === 204) {
      console.log(`Pin Code with ID ${id} deleted successfully`);
      return response.data;
    }
  } catch (error) {
    console.error("The error is:", error);
    throw error;
  }
}
