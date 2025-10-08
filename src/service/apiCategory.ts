import axiosInstance from "@/lib/axios";

export interface CategoryPayload {
  id: number;
  name: string;
  description?: string;
}

export async function getCategories(): Promise<CategoryPayload[]> {
  let allCategories: CategoryPayload[] = [];
  let currentPage = 1;
  const limit = 15;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosInstance.get(
        `/categories?page=${currentPage}&limit=${limit}`
      );

      if (response?.status === 200) {
        const data = response.data.data || [];

   
        allCategories = [
          ...allCategories,
          ...data.map((cat: CategoryPayload) => ({
            name: cat.name || "",
            description: cat.description ?? "",
          })),
        ];

        hasMore = data.length === limit;
        currentPage += 1;
      } else {
        console.log("Unexpected response:", response);
        hasMore = false;
      }
    }

    return allCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return allCategories;
  }
}

export async function createCategory(data: CategoryPayload) {
  try {
    const response = await axiosInstance.post("/categories", data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function updateCategory(id: string, data: CategoryPayload) {
  try {
    const response = await axiosInstance.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(id: string) {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

export async function toggleCategoryStatus(id: string, isActive: boolean) {
  try {
    const response = await axiosInstance.put(`/categories/${id}`, {
      is_active: isActive,
    });
    return response.data;
  } catch (error) {
    console.error("Error toggling category status:", error);
    throw error;
  }
}
