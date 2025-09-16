export type SubCategory = {
  id: string;
  name: string;
  description?: string;
  category?: {
    name: string;
    is_active: number;
  };
};
