import axiosInstance from "@/lib/axios";

import type { PullCar } from "@/table-types/pull-car-types";



export const getAllPullCars = async (): Promise<PullCar[]> => {
  let allPullCars: PullCar[] = [];
  let currentPage = 1;
  const limit = 15; // adjust if API supports a limit
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axiosInstance.get(`/pullcars?page=${currentPage}&limit=${limit}`);

      if (response && response.status === 200) {
        const data: PullCar[] = response.data.data || [];

        allPullCars = [...allPullCars, ...data];

        if (data.length < limit) {
          hasMore = false; // last page
        } else {
          currentPage += 1; // next page
        }
      } else {
        console.log("Unexpected response:", response);
        hasMore = false;
      }
    }

    return allPullCars;
  } catch (error) {
    console.error("Error fetching pull cars:", error);
    return allPullCars;
  }
};
