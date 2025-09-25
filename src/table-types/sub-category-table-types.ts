export type SubCategory = {
  id: string;
  name: string;
  description?: string;
  category?: {
    id: number;
    name: string;
    is_active: number;
  };
};
