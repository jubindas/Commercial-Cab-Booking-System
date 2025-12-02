export type SubCategory = {
  id: string;
  name: string;
  description?: string;
  is_active: number;
  image?: string;
  category?: {
    id: number;
    name: string;
    is_active: number;
  };
};
