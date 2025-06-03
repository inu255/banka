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
  openDate: string;
  image?: { file: File };
};
