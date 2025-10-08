import axiosInstance from "@/lib/axios";

export const getPullCar = async () => {
  try {
    const response = await axiosInstance.get("/pullcars");
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log("the error is", error);
  }
};
