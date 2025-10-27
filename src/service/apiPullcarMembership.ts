import axiosInstance from "@/lib/axios";

import type { PullCarMembership } from "@/table-types/pullcar-memberships-types";

export const getAllPullCars = async () => {
  try {
    const response = await axiosInstance.get("/pullcar-memberships");

    if (response.status !== 200) {
      throw new Error("something went wrong, please try again");
    }

    return response.data;
  } catch (error) {
    console.log("the err is", error);
    throw error;
  }
};

export const createPullCarsMembership = async (
  data: PullCarMembership,
  token: string | null
) => {
  console.log("the backend data is", data);
  try {
    const response = await axiosInstance.post(`/pullcar-memberships`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 201) {
      throw new Error("something went wrong, try again");
    }

    return response.data;
  } catch (error) {
    console.log("the err is", error);
  }
};

export const updatePullCarsMembership = async (
  id: string | undefined,
  data: PullCarMembership,
  token: string | null
) => {
  console.log("the datas are", id, data, token);
  try {
    const response = await axiosInstance.put(
      `/pullcar-memberships/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("somethimg went wrong, try again later");
    }

    return response.data;
  } catch (error) {
    console.error(`Error updating pull car ${id}:`, error);
    throw error;
  }
};

export const disablePullCarMembership = async (
  id: string,
  isActive: boolean,
  token: string | null
) => {
  try {
    const response = await axiosInstance.put(
      `/pullcar-memberships/${id}`,
      {
        is_active: isActive,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("something went wrong try again");
    }

    console.log("the response data is", response.data);

    return response.data;
  } catch (error) {
    console.log("the error is", error);
  }
};
