import axiosInstance from "@/lib/axios";

export const getStates = async () => {
  try {
    const response = await axiosInstance.get("/states");

    if (response && response.status === 200) {
      return response.data;
    } else {
      console.log("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.log("the error is", error);
  }
};

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
