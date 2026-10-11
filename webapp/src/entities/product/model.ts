import type { Dayjs } from "dayjs";

export type ProductType = {
  id: string;
  name: string;
  brand: {
    label: string;
    value: string;
  };
  category: {
    label: string;
    value: string;
  };
  openDate: Dayjs;
  image?: { file: File };
};
