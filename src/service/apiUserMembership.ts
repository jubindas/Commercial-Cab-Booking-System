import axiosInstance from "@/lib/axios";

import type { MembershipData } from "@/table-types/user-membership-types";

export async function getUserMemberships(
  token?: string | null
): Promise<MembershipData[]> {
  let allMemberships: MembershipData[] = [];
  let currentPage = 1;
  const limit = 15;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosInstance.get(
        `/user-memberships?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response && response.status === 200) {
        const data: MembershipData[] = response.data.data || [];

        allMemberships = [...allMemberships, ...data];

        if (data.length < limit) {
          hasMore = false;
        } else {
          currentPage += 1;
        }
      } else {
        console.warn("Unexpected response:", response);
        hasMore = false;
      }
    }

    return allMemberships;
  } catch (error) {
    console.error("Error fetching user memberships:", error);
    return allMemberships;
  }
}

export async function createUserMembership(membershipData: {
  membershipId: number;
  quantity: number | null;
  member: number | null;
  price: number | null;
  total_price: number | null;
  notes: string | null;
}) {
  try {
    const payload = {
      membership_id: membershipData.membershipId,
      quantity: membershipData.quantity,
      member: membershipData.member,
      price: membershipData.price,
      total_price: membershipData.total_price,
      notes: membershipData.notes,
    };

    const response = await axiosInstance.post(`/user-memberships`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating user membership:", error);
    throw error;
  }
}
