import type { User } from "firebase/auth";
import { api, apiErrorMessage, type Product } from "src/shared/api";

export const getProductById = async (productId: string, user: User): Promise<Product> => {
  if (!user) throw new Error("User is not authenticated");

  const { data, error } = await api.GET("/products/{id}", {
    params: { path: { id: productId } },
  });

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось загрузить продукт"));
  }

  return data;
};
