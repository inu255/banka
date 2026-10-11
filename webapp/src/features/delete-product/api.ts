import { api, apiErrorMessage } from "src/shared/api";

export const deleteProductById = async (productId: string): Promise<void> => {
  const { error } = await api.DELETE("/products/{id}", {
    params: { path: { id: productId } },
  });

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось удалить продукт"));
  }
};
