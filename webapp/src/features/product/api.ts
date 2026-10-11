import type { User } from "firebase/auth";
import { api, apiErrorMessage, type Product, type ProductShort } from "src/shared/api";

// Payload формы добавления — то, что реально собирает UI. В форме brand/category
// представлены как { id, name }, а бэкенд ждёт brandId/categoryId — мапим здесь.
export type AddProductPayload = {
  name: string;
  openDate: string;
  image?: string;
  brand: { id: string; name: string };
  category: { id: string; name: string };
};

export const getProducts = async (_user: User): Promise<Product[]> => {
  const { data, error } = await api.GET("/products");

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось загрузить продукты"));
  }

  return data;
};

export const getProductsByCategory = async (categoryId: string): Promise<ProductShort[]> => {
  const { data, error } = await api.GET("/products/by-category/{categoryId}", {
    params: { path: { categoryId } },
  });

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось загрузить продукты"));
  }

  return data;
};

export const addProduct = async (_uid: string, product: AddProductPayload): Promise<string> => {
  const { data, error } = await api.POST("/products", {
    body: {
      name: product.name,
      brandId: product.brand.id,
      categoryId: product.category.id,
      openDate: product.openDate,
      image: product.image,
    },
  });

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось добавить продукт"));
  }

  return data.id; // возвращаем ID нового продукта
};
