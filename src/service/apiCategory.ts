import axiosInstance from "@/lib/axios";

import type { MainCategory } from "@/table-types/main-category-table-types";

export type CategoryPayload = {
  id: number;
  name: string;
};

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get("/categories");
    console.log("the category response is", res);

    if (res.status !== 200) {
      throw new Error(
        "something went wrong fetching category, Please try again"
      );
    }

    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export async function createCategory(data: MainCategory) {
  try {
    const response = await axiosInstance.post("/categories", data);

    if (response.status !== 201) {
      throw new Error(
        "something went wrong creating category, Please try again"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function updateCategory(id: string, data: MainCategory) {
  try {
    const response = await axiosInstance.put(`/categories/${id}`, data);

    if (response.status !== 200) {
      throw new Error(
        "something went wrong updating category, Please try again"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(id: string) {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);

    if (response.status !== 204) {
      throw new Error(
        "something went wrong deleting category, Please try again"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

export async function toggleCategoryStatus(id: string, isActive: boolean) {
  try {
    console.log("the backend data", id, isActive);
    const response = await axiosInstance.put(`/categories/${id}`, {
      is_active: isActive,
    });
    if (response.status !== 200) {
      throw new Error(
        "something went wrong toggling status category, Please try again"
      );
    }
    console.log("the response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggling category status:", error);
    throw error;
  }
}
