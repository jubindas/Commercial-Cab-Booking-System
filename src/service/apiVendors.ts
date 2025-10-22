import axiosInstance from "@/lib/axios";

export const getAllvendors = async () => {
  try {
    const response = await axiosInstance.get("/vendors");

    if (response.status !== 200) {
      throw new Error("something went wrong try again");
    }

    return response.data.data;
  } catch (error) {
    console.log("the error is", error);
  }
};

export const getVendorById = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`/vendors/${id}`);
    if (response.status !== 200) {
      throw new Error("something went wrong try again");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching vendor by ID:", error);
    throw error;
  }
};
