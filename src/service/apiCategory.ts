import axiosInstance from "@/lib/axios";


export interface CategoryPayload {
  name: string;
  description?: string;
}

export async function getCategories() {
  try {
    const response = await axiosInstance.get("/categories");
    if (response && response.status === 200) {
      return response.data.data;
    } else {
      console.log("Unexpected response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
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
    const response = await axiosInstance.put(`/categories/${id}`, { is_active: isActive });
    return response.data;
  } catch (error) {
    console.error("Error toggling category status:", error);
    throw error;
  }
}
