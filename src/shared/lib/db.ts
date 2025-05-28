import Dexie, { type Table } from "dexie";

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

// Создание базы данных
export const db = new Dexie("AppDatabase") as Dexie & {
  products: Table<Product, number>;
  brands: Table<Brand, number>;
  categories: Table<Category, number>;
};

db.version(1).stores({
  products: "++id, name, brandId, categoryId, openDate",
  brands: "++id, name",
  categories: "++id, name",
});
