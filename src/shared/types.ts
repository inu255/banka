export interface Product {
  id?: string;
  name: string;
  brand: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
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
