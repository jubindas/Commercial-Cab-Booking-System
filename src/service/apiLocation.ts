import axiosInstance from "@/lib/axios";

export interface LocationPayload {
  id: number;
  name: string;
  cityId?: number;
  districtId?: number;
}

export async function getAllLocations(): Promise<LocationPayload[]> {
  let allLocations: LocationPayload[] = [];
  let currentPage = 1;
  const limit = 15; // adjust if API supports a limit
  let hasMore = true;

  try {
    while (hasMore) {
      // Fetch current page
      const response = await axiosInstance.get(`/locations?page=${currentPage}&limit=${limit}`);

      if (response && response.status === 200) {
        const data: LocationPayload[] = response.data.data || [];

        // Add to cumulative array
        allLocations = [...allLocations, ...data];

        // If fewer items than limit, last page reached
        if (data.length < limit) {
          hasMore = false;
        } else {
          currentPage += 1; // move to next page
        }
      } else {
        console.log("Unexpected response:", response);
        hasMore = false;
      }
    }

    return allLocations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return allLocations;
  }
}

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
