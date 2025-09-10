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

    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login request failed");
  }
}
