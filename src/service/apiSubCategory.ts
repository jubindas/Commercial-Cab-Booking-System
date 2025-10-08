import axiosInstance from "@/lib/axios";

import type { SubCategory } from "@/table-types/sub-category-table-types";

export async function getAllSubcategories(): Promise<SubCategory[]> {
  let allSubcategories: SubCategory[] = [];
  let currentPage = 1;
  const limit = 15;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosInstance.get(
        `/sub-categories?page=${currentPage}&limit=${limit}`
      );

      if (response && response.status === 200) {
        const data: SubCategory[] = response.data.data || [];

        allSubcategories = [...allSubcategories, ...data];

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

    return allSubcategories;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return allSubcategories;
  }
}

export async function createSubcategory(data: {
  name: string;
  description: string;
  category_id: number;
}) {
  try {
    const response = await axiosInstance.post("/sub-categories", data);
    if (response && response.status === 201) {
      console.log("Subcategory created:", response.data);
      return response.data;
    } else {
      console.warn("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating subcategory:", error);
    throw error;
  }
}

export async function updateSubcategory(
  id: number,
  data: { name?: string; description?: string; category_id?: number }
) {
  try {
    const response = await axiosInstance.put(`/sub-categories/${id}`, data);
    if (response && response.status === 200) {
      console.log("Subcategory updated:", response.data);
      return response.data;
    } else {
      console.warn("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error(`Error updating subcategory with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteSubcategory(id: number) {
  try {
    const response = await axiosInstance.delete(`/sub-categories/${id}`);
    if (response && response.status === 200) {
      console.log("Subcategory deleted:", response.data);
      return response.data;
    } else {
      console.warn("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error(`Error deleting subcategory with ID ${id}:`, error);
    throw error;
  }
}

export async function toggleSubCategoryStatus(id: string, isActive: boolean) {
  try {
    const response = await axiosInstance.put(`/sub-categories/${id}`, {
      is_active: isActive,
    });
    return response.data;
  } catch (error) {
    console.error("Error toggling sub category status:", error);
    throw error;
  }
}
