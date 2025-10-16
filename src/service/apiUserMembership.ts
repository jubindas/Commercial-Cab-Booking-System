import axiosInstance from "@/lib/axios";

export const getUserMembership = async (token: string | null) => {
  try {
    const response = await axiosInstance.get("/user-memberships", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("something went wrong, try again");
    }

    return response.data;
  } catch (error) {
    console.log("the error is", error);
  }
};
