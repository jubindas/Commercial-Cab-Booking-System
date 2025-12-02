import axiosInstance from "@/lib/axios";

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
    throw error;
  }
};

export async function createCategory(formData: FormData) {
  try {
    const response = await axiosInstance.post("/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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

export async function updateCategory(id: string, formData: FormData) {
  console.log("updating category with id:", id);
  console.log("updating category with data:", Object.fromEntries(formData));
  try {
    const response = await axiosInstance.post(`/categories/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 200) {
      throw new Error(
        "Something went wrong updating the category. Please try again."
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
