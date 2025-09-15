import axiosInstance from "@/lib/axios";

export async function getSubcategories() {
  try {
    const response = await axiosInstance.get("/sub-categories");
    if (response && response.status === 200) {
      return response.data.data;
    } else {
      console.warn("Unexpected response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return [];
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
  data: {  name?: string;
  description?: string;  
  category_id?: number; }
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
