import axiosInstance from "@/lib/axios";

import type { PullCar } from "@/table-types/pull-car-types";



export const getAllPullCars = async (): Promise<PullCar[]> => {
  let allPullCars: PullCar[] = [];
  let currentPage = 1;
  const limit = 15;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosInstance.get(
        `/pullcars?page=${currentPage}&limit=${limit}`
      );

      if (response && response.status === 200) {
        const data: PullCar[] = response.data.data || [];

        allPullCars = [...allPullCars, ...data];

        if (data.length < limit) {
          hasMore = false;
        } else {
          currentPage += 1;
        }
      } else {
        console.log("Unexpected response:", response);
        hasMore = false;
      }
    }
    console.log("the cars are", allPullCars);

    return allPullCars;
  } catch (error) {
    console.error("Error fetching pull cars:", error);
    return allPullCars;
  }
};

export const createPullCar = async (payload: {
  name?: string | null;
  car_details?: string | null;
  description?: string | null;
  price: number;
  journey_start_time: string;
  capacity: number;
  location_start: string;
  location_end: string;
  images?: string[] | null;
}) => {
  try {
    const response = await axiosInstance.post("/pullcars", payload);

    return response.data;
  } catch (error) {
    console.error("Error creating pull car:", error);
    throw error;
  }
};

export const updatePullCar = async (
  id: number,
  payload: {
    name?: string | null;
    car_details?: string | null;
    description?: string | null;
    price?: number;
    journey_start_time?: string;
    capacity?: number;
    location_start?: string;
    location_end?: string;
    images?: string[] | null;
  }
) => {
  try {
    const response = await axiosInstance.put(`/pullcars/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error(`Error updating pull car ${id}:`, error);
    throw error;
  }
};

export const deletePullCar = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/pullcars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting pull car ${id}:`, error);
    throw error;
  }
};
