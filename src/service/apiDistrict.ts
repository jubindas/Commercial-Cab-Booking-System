import axios from "axios";
import { API_BASE_URL } from "@/lib/db";



export async function getDistrict() {
  try {
    const response = await axios.get(`${API_BASE_URL}/districts`);

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



export async function createDistrict(district: {state_id: string, name: string, code: string}) {

  try {
    const response = await axios.post(`${API_BASE_URL}/districts`, district)
   
    if (response && response.status === 201) {
      return response.data;
    } else {
      console.log("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.log("the err is", error);
  }
  
}



export async function deleteDistrict(id: string) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/districts/${id}`);

    if (response.status === 200 || response.status === 204) {
      console.log(`Districta with ID ${id} deleted successfully`);
      return response.data; 
    }
  } catch (error) {
    console.error("The error is:", error);
    throw error; 
  }
}