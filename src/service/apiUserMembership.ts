import axiosInstance from "@/lib/axios";

export const getUserMembership = async (token: string | null) => {
  try {
    const response = await axiosInstance.get("/admin/memberships/all/user", {
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
    throw error;
  }
};

export async function toggleUserMembershipApproval(
  id: string,
  isApproved: boolean | undefined,
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

export async function rejectUserMembership(id: string, token: string | null) {
  if (!token) throw new Error("Missing authorization token");

  try {
    const response = await axiosInstance.post(
      `/admin/memberships/reject/user/${id}`,
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
