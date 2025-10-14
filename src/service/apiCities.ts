import axiosInstance from "@/lib/axios";

export const getCities = async () => {
  try {
    const res = await axiosInstance.get("/cities");

    if(res.status !== 200){
      throw new Error("Something went wrong in fetchong cities, Please try again")
    }

    return res.data.data;
  } catch (error) {
    console.log("the err is", error);
  }
};

export async function createCity(city: {
  district_id: string;
  name: string;
  code: string | null;
}) {
  try {
    const response = await axiosInstance.post(`/cities`, city);

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

export async function deleteCity(id: string) {
  try {
    const response = await axiosInstance.delete(`/cities/${id}`);

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
  updatedData: { district_id: string; name: string; code: string | null }
) {
  try {
    console.log("Sending update request:", { id, updatedData });

    const response = await axiosInstance.put(`/cities/${id}`, updatedData);

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
