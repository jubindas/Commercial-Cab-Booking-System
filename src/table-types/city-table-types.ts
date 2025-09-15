export type City = {
    id: string,
    district_id: string,
    name: string,
    code?: string,
   district: {
    code: string;
  };
    status: string,
}