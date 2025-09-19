import { API_BASE_URL } from "@/lib/db";
import axios from "axios";

export async function userLogin(email: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    console.log("Login successful:", response.data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return {
      token: response.data.token,
      user: response.data.user,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login request failed");
  }
}








export async function vendorMe(token: string | null) {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error) {
    console.error("vendor err is :", error);
    throw error;
  }
}
