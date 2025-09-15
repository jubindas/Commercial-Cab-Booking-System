import axios from "axios";
import { API_BASE_URL } from "@/lib/db";



export async function getDistrict(token: string | null) {
  try {
    const response = await axios.get(`${API_BASE_URL}/districts`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

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



export async function createDistrict(district: {state_id: string, name: string, code: string},   token: string | null) {

  try {
    const response = await axios.post(`${API_BASE_URL}/districts`, district, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
   
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




export async function updateDistrict(
  id: string,
  updatedData: { state_id: string; name: string; code: string }, token: string | null
) {
  try {
    const response = await axios.put(`${API_BASE_URL}/districts/${id}`, updatedData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

    if (response && (response.status === 200 || response.status === 201)) {
      console.log(`District with ID ${id} updated successfully`, response.data);
      return response.data;
    } else {
      console.log("Unexpected response while updating district:", response);
      return null;
    }
  } catch (error) {
    console.error("Error while updating district:", error);
    throw error;
  }
}






export async function deleteDistrict(id: string,  token: string | null) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/districts/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (response.status === 200 || response.status === 204) {
      console.log(`Districta with ID ${id} deleted successfully`);
      return response.data; 
    }
  } catch (error) {
    console.error("The error is:", error);
    throw error; 
  }
}