export type Category = {
  id: string;
  sequence: number;
  name: string;
  status: CategoryStatus;
};

type CategoryStatus = "active" | "inactive";
