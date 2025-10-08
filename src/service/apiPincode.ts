import axiosInstance from "@/lib/axios";

export interface PincodePayload {
  id: number;
  code: string;
  cityId?: number;
  districtId?: number;
}

export async function getPincode(): Promise<PincodePayload[]> {
  let allPincodes: PincodePayload[] = [];
  let currentPage = 1;
  const limit = 15; // adjust if your API supports a limit
  let hasMore = true;

  try {
    while (hasMore) {
      // Fetch current page
      const response = await axiosInstance.get(
        `/pin-codes?page=${currentPage}&limit=${limit}`
      );

      if (response && response.status === 200) {
        const data: PincodePayload[] = response.data.data || [];

        // Append fetched data
        allPincodes = [...allPincodes, ...data];

        // Stop if fewer items than limit
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

    return allPincodes;
  } catch (error) {
    console.error("Error fetching pin codes:", error);
    return allPincodes;
  }
}

export async function createPincode(pinCode: {
  location_id: string;
  area_name?: string | null;
  pin_code: string;
  fallback_pin_codes?: string[] | null;
}) {
  try {
    console.log("Sending data:", pinCode);
    const response = await axiosInstance.post(`/pin-codes`, pinCode);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("the err is", error.response?.data || error);
    throw error;
  }
}

export async function deletePincode(id: string) {
  try {
    const response = await axiosInstance.delete(`/pin-codes/${id}`);

    if (response.status === 200 || response.status === 204) {
      console.log(`Pin Code with ID ${id} deleted successfully`);
      return response.data;
    }
  } catch (error) {
    console.error("The error is:", error);
    throw error;
  }
}

export async function updatePincode(
  id: string,
  updatedData: {
    location_id: string;
    area_name?: string | null;
    pin_code: string;
    fallback_pin_codes?: string[] | null;
  }
) {
  try {
    const response = await axiosInstance.put(`/pin-codes/${id}`, updatedData);

    if (response && (response.status === 200 || response.status === 201)) {
      console.log(`Pin Code with ID ${id} updated successfully`, response.data);
      return response.data;
    } else {
      console.log("Unexpected response while updating pincode:", response);
      return null;
    }
  } catch (error) {
    console.error("Error while updating pincode:", error);
    throw error;
  }
}
