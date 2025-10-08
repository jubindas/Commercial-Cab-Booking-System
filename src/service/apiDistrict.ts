import axiosInstance from "@/lib/axios";

export interface DistrictPayload {
  id: number;
  name: string;
  state?: string;
  country?: string;
}

export async function getAllDistricts(): Promise<DistrictPayload[]> {
  let allDistricts: DistrictPayload[] = [];
  let currentPage = 1;
  const limit = 15; // adjust if your API supports a limit
  let hasMore = true;

  try {
    while (hasMore) {
      // Fetch the current page
      const response = await axiosInstance.get(`/districts?page=${currentPage}&limit=${limit}`);

      if (response && response.status === 200) {
        const data: DistrictPayload[] = response.data.data || [];

        // Append fetched data
        allDistricts = [...allDistricts, ...data];

        // If less than limit, no more pages
        if (data.length < limit) {
          hasMore = false;
        } else {
          currentPage += 1; // go to next page
        }
      } else {
        console.log("Unexpected response:", response);
        hasMore = false;
      }
    }

    return allDistricts;
  } catch (error) {
    console.error("Error fetching districts:", error);
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