import axiosInstance from "@/lib/axios";

export async function getDistrict() {
  try {
    const response = await axiosInstance.get(`/districts`);

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
  updatedData: { state_id: string; name: string; code: string }
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