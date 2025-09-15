import axiosInstance from "@/lib/axios";

export interface MembershipPayload {
  sub_category_id: number;
  name: string;
  description: string;
  price: number;
  discounted_price: number;
  discounted_percentage: number;
}

export async function getMemberships() {
  try {
    const response = await axiosInstance.get("/memberships");
    if (response && response.status === 200) {
      return response.data.data;
    } else {
      console.log("Unexpected response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching memberships:", error);
    return [];
  }
}

export async function createMembership(data: MembershipPayload) {
  try {
    const response = await axiosInstance.post("/memberships", data);
    return response.data;
  } catch (error) {
    console.error("Error creating membership:", error);
    throw error;
  }
}

export async function updateMembership(
  id: string | number,
  data: MembershipPayload
) {
  try {
    const response = await axiosInstance.put(`/memberships/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating membership:", error);
    throw error;
  }
}

export async function deleteMembership(id: string | number) {
  try {
    const response = await axiosInstance.delete(`/memberships/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting membership:", error);
    throw error;
  }
}
