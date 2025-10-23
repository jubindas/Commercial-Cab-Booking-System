import axiosInstance from "@/lib/axios";

export const getAllUserMembership = async (token: string | null) => {
  try {
    const response = await axiosInstance("/admin/memberships/all/pullcar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("something went wrong try again later");
    }

    return response.data;
  } catch (error) {
    console.log("the error is", error);
  }
};
