import type { Pincode } from "@/table-types/pincode-table-types"

export const dummyPincodes: Pincode[] = [
  {
    id: "1",
    pincode: "560001",
    fallBackPincode: ["560002", "560003", "560004"],
  },
  {
    id: "2",
    pincode: "110001",
    fallBackPincode: ["110002", "110003"],
  },
  {
    id: "3",
    pincode: "400001",
    fallBackPincode: ["400002", "400003", "400004", "400005"],
  },
]
