import axiosInstance from "@/lib/axios";

export const getAllPullCars = async () => {
  try {
    const response = await axiosInstance.get(`/pullcars`);

    if (response && response.status === 200) {
      return response.data.data;
    } else {
      console.log("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.log("the error is", error);
  }
};

export const createPullCar = async (payload: FormData) => {
  try {
    console.log("Sending payload to /pullcars:", payload);
    const response = await axiosInstance.post("/pullcars", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    console.log("Pull car created successfully:", response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating pull car:", error.response?.data || error);
    throw error;
  }
};

export const updatePullCar = async (
  id: number,
  data:
    | FormData
    | {
        name?: string | null;
        car_details?: string | null;
        description?: string | null;
        price?: number;
        journey_start_time?: string;
        capacity?: number;
        location_start?: string;
        location_end?: string;
        images?: string[];
      }
) => {
  try {
    console.log("the paylod is", id, data);
    const response = await axiosInstance.put(`/pullcars/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating pull car ${id}:`, error);
    throw error;
  }
};

export const deletePullCar = async (id: string) => {
  console.log("Attempting to delete pull car with ID:", id);
  try {
    const response = await axiosInstance.delete(`/pullcars/${id}`);
    console.log("Backend responded:", response);
    console.log(" Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting pull car:", error);
    throw error;
  }
};

export const getPullcarById = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`pullcars/${id}`);
    console.log("the response is", response.data);
    return response.data;
  } catch (error) {
    console.log("the err is", error);
  }
};
