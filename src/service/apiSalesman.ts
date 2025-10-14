/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";

export const createSalesMan = async (data: {
  name: string;
  email: string;
  phone: string | null;
  alternative_phone_number: string | null;
  password: string;
  password_confirmation: string;
  role: string;
  address: string | null;
  id_proof: File | null;
  address_proof: File | null;
  state_id: number | null;
  district_id: number | null;
  city_id: number | null;
  location_id: number | null;
  pin_code_id: number | null;
}) => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });

    const response = await axiosInstance.post("/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error creating salesman:", error.response?.data || error);
    throw error;
  }
};

export const getAllSalesmen = async (token: string | null) => {
  try {
    const response = await axiosInstance.get(`/salesmen`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.status === 200) {
      return response.data.data;
    } else {
      console.log("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.log("the error is", error);
  }
};

export const deleteSalesmen = async (id: string, token: string | null) => {
  try {
    const response = await axiosInstance.delete(`/salesmen/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log("the error is", error);
  }
};

export const getSalesmenById = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`/salesmen/${id}`);

    return response.data;
  } catch (error) {
    console.log("the err is", error);
  }
};

export const getSalesmanReferral = async (
  id: string | undefined,
  token: string | null
) => {
  try {
    const response = await axiosInstance.get(`/sales/referrals/vendors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("the error is ", error);
  }
};
