import axiosInstance from "@/lib/axios";

export interface MembershipPayload {
  sub_category_id: number;
  name: string;
  description: string;
  price: number;
  discounted_price: number | null;
  discounted_percentage: number | null;
}

export async function getAllMemberships(): Promise<MembershipPayload[]> {
  let allMemberships: MembershipPayload[] = [];
  let currentPage = 1;
  const limit = 15; // adjust if API supports a limit
  let hasMore = true;

  try {
    while (hasMore) {
      // Fetch current page
      const response = await axiosInstance.get(`/memberships?page=${currentPage}&limit=${limit}`);

      if (response && response.status === 200) {
        const data: MembershipPayload[] = response.data.data || [];

        // Append fetched data
        allMemberships = [...allMemberships, ...data];

        // If fewer items than limit, last page reached
        if (data.length < limit) {
          hasMore = false;
        } else {
          currentPage += 1; // move to next page
        }
      } else {
        console.log("Unexpected response:", response);
        hasMore = false;
      }
    }

    return allMemberships;
  } catch (error) {
    console.error("Error fetching memberships:", error);
    return allMemberships;
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
