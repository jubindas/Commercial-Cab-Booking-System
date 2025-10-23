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

export async function togglePoolUserMembershipApproval(
  id: string,
  isApproved: boolean,
  token: string | null
) {
  if (isApproved) {
    console.log("Membership is already approved");
    return { message: "Membership is already approved" };
  }

  if (!token) throw new Error("Missing authorization token");

  try {
    const response = await axiosInstance.post(
      `/admin/memberships/approve/user/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Something went wrong while approving membership");
    }

    return response.data;
  } catch (error) {
    console.error("Error approving membership:", error);
    throw error;
  }
}

export async function rejectPoolUserMembership(id: string, token: string | null) {
  if (!token) throw new Error("Missing authorization token");

  try {
    const response = await axiosInstance.post(
      `/admin/memberships/reject/pullcar/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Something went wrong while rejecting membership");
    }

    return response.data;
  } catch (error) {
    console.error("Error rejecting membership:", error);
    throw error;
  }
}
