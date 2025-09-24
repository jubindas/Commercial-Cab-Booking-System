import axiosInstance from "@/lib/axios";

export async function getUserMemberships(token?: string | null) {
  try {
    const response = await axiosInstance.get(`/user-memberships`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching user memberships:", error);
    throw error;
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
