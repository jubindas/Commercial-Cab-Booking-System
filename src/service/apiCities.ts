import { API_BASE_URL } from "@/lib/db";

import axios from "axios";


export async function getCities(token: string | null) {

    try {
        const response = await axios.get(`${API_BASE_URL}/cities`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })

   
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




export async function createCity(city: {district_id: string, name: string, code: string}, token: string | null) {

  try {
    const response = await axios.post(`${API_BASE_URL}/cities`, city, {
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


export async function deleteCity(id: string, token: string | null) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/cities/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (response.status === 200 || response.status === 204) {
      console.log(`City with ID ${id} deleted successfully`);
      return response.data; 
    }
  } catch (error) {
    console.error("The error is:", error);
    throw error; 
  }
}


export async function updateCity(
  id: string,
  updatedData: { district_id: string; name: string; code: string },
  token: string | null
) {
  try {
    console.log("Sending update request:", { id, updatedData, token });

    const response = await axios.put(
      `${API_BASE_URL}/cities/${id}`,
      updatedData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    if (response && (response.status === 200 || response.status === 201)) {
      console.log(`City with ID ${id} updated successfully`, response.data);
      return response.data;
    } 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      console.error("Update failed with response:", error.response.data);
    } else {
      console.error("Error while updating city:", error.message);
    }
    throw error;
  }
}
