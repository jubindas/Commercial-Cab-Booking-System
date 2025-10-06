import axiosInstance from "@/lib/axios";

import type { Membership } from "@/table-types/membership-table-types";

export interface MembershipPayload {
  sub_category_id: number;
  name: string;
  description: string;
  price: number;
  discounted_price: number | null;
  discounted_percentage: number | null;
}

export async function getMemberships(): Promise<Membership[]> {
  let allMemberships: Membership[] = [];
  let currentPage = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosInstance.get(
        `/memberships?page=${currentPage}`
      );
      if (response && response.status === 200) {
        const data = response.data.data;
        if (data.length > 0) {
          allMemberships = [...allMemberships, ...data];
          currentPage++;
        } else {
          hasMore = false;
        }
      } else {
        console.log("Unexpected response:", response);
        hasMore = false;
      }
    }
    return allMemberships;
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
