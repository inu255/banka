export interface Product {
  id?: string;
  name: string;
  brandId: string;
  categoryId: string;
  openDate: string;
  image?: string;
}

export interface Brand {
  id?: string;
  name: string;
}

export interface Category {
  id?: string;
  name: string;
}

export interface App {
  products: Product[];
  brands: Brand[];
  categories: Category[];
}
