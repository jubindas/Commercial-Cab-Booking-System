import axiosInstance from "@/lib/axios";

export const getLocation = async () => {
  try {
    const res = await axiosInstance.get("/locations");

    if (res && res.status === 200) {
      return res.data;
    } else {
      console.log("Unexpected response:", res);
      return null;
    }
  } catch (error) {
    console.log("the error is", error);
  }
};

export async function createLocation(locations: {
  city_id: string;
  name: string;
  code: string;
  latitude?: string | null;
  longitude?: string | null;
}) {
  try {
    const response = await axiosInstance.post(`/locations`, locations);

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

export async function deleteLocation(id: string) {
  try {
    const response = await axiosInstance.delete(`/locations/${id}`);

    if (response.status === 200 || response.status === 204) {
      console.log(`Location with ID ${id} deleted successfully`);
      return response.data;
    }
  } catch (error) {
    console.error("The error is:", error);
    throw error;
  }
}

export async function updateLocation(
  id: string,
  updatedData: {
    city_id: string;
    name: string;
    code: string;
    latitude?: string | null;
    longitude?: string | null;
  }
) {
  try {
    const response = await axiosInstance.put(`/locations/${id}`, updatedData);

    if (response && (response.status === 200 || response.status === 201)) {
      console.log(`Location with ID ${id} updated successfully`, response.data);
      return response.data;
    } else {
      console.log("Unexpected response while updating location:", response);
      return null;
    }
  } catch (error) {
    console.error("Error while updating location:", error);
    throw error;
  }
}
