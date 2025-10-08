import axiosInstance from "@/lib/axios";

import type { District } from "@/table-types/district-table-types";


export async function getDistrict(): Promise<District[]> {
  let allDistricts: District[] = [];
  let currentPage = 1;
  const limit = 15;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosInstance.get(`/districts?page=${currentPage}&limit=${limit}`);
      if (response?.status === 200) {
        const data: District[] = response.data.data || [];
        allDistricts = [
          ...allDistricts,
          ...data.map(d => ({
            id: d.id,
            name: d.name,
            state_id: d.state_id || "",
            code: "",
            status: "active",
          }))
        ];
        hasMore = data.length === limit;
        currentPage += 1;
      } else {
        hasMore = false;
      }
    }
    return allDistricts;
  } catch (err) {
    console.error(err);
    return allDistricts;
  }
}



export async function createDistrict(district: {state_id: string, name: string, code: string | null}) {

  try {
    const response = await axiosInstance.post(`/districts`, district)
   
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
  updatedData: { state_id: string; name: string; code: string | null }
) {
  try {
    const response = await axiosInstance.put(`/districts/${id}`, updatedData);

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






export async function deleteDistrict(id: string) {
  try {
    const response = await axiosInstance.delete(`/districts/${id}`);

    if (response.status === 200 || response.status === 204) {
      console.log(`Districta with ID ${id} deleted successfully`);
      return response.data; 
    }
  } catch (error) {
    console.error("The error is:", error);
    throw error; 
  }
}