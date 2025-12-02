import axiosInstance from "@/lib/axios";

export const getSubcategories = async () => {
  try {
    const response = await axiosInstance.get(`/sub-categories`);

    if (response && response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response: ${response.statusText}`);
    }
  } catch (error) {
    console.log("the error is", error);
    throw error;
  }
};

export async function createSubcategory(
  data: FormData | { name: string; description: string; category_id: number }
) {
  try {
    const isFormData = data instanceof FormData;

    console.log("the sub category response is", isFormData);

    const response = await axiosInstance.post("/sub-categories", data, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });

    if (response?.status === 201) {
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
  data:
    | FormData
    | {
        name?: string;
        description?: string;
        category_id?: number;
      }
) {
  try {
    const isFormData = data instanceof FormData;

    const response = await axiosInstance.post(`/sub-categories/${id}`, data, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });

    if (response?.status === 200) {
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
