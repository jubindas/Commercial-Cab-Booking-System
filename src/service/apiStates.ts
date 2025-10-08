import axiosInstance from "@/lib/axios";

import type { State } from "@/table-types/state-table-types";

export async function getStates(): Promise<State[]> {
  let allStates: State[] = [];
  let currentPage = 1;
  const limit = 15;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosInstance.get(
        `/states?page=${currentPage}&limit=${limit}`
      );

      if (response && response.status === 200) {
        const data: State[] = response.data.data || [];

        allStates = [...allStates, ...data];

        if (data.length < limit) {
          hasMore = false;
        } else {
          currentPage += 1;
        }
      } else {
        console.log("Unexpected response:", response);
        hasMore = false;
      }
    }

    return allStates;
  } catch (error) {
    console.error("Error fetching states:", error);
    return allStates;
  }
}

export async function createState(states: {
  name: string;
  code: string | null;
}) {
  try {
    const response = await axiosInstance.post(`/states`, states);

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

export async function deleteStates(id: string) {
  try {
    const response = await axiosInstance.delete(`/states/${id}`);

    if (response.status === 200 || response.status === 204) {
      console.log(`State with ID ${id} deleted successfully`);
      return response.data;
    }
  } catch (error) {
    console.error("The error is:", error);
    throw error;
  }
}

export async function updateState(
  id: string,
  updatedData: { name: string; code: string | null }
) {
  try {
    const response = await axiosInstance.put(`/states/${id}`, updatedData);

    if (response && (response.status === 200 || response.status === 201)) {
      console.log(`State with ID ${id} updated successfully`, response.data);
      return response.data;
    } else {
      console.log("Unexpected response while updating state:", response);
      return null;
    }
  } catch (error) {
    console.error("Error while updating state:", error);
    throw error;
  }
}
