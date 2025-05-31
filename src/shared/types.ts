export interface Product {
  id?: number;
  name: string;
  brandId: number;
  categoryId: number;
  openDate: string;
  image?: string;
}

export interface Brand {
  id?: number;
  name: string;
}

export interface Category {
  id?: number;
  name: string;
}

export interface App {
  products: Product[];
  brands: Brand[];
  categories: Category[];
}
