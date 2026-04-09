export type Category = {
  id: string;
  position: number;
  name: string;
  slug: string;
  status: CATEGORY_STATUS;
};

export type CATEGORY_STATUS = "ACTIVE" | "INACTIVE";
