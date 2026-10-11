import { api, apiErrorMessage } from "src/shared/api";

export const deleteCategory = async (categoryId: string): Promise<void> => {
  const { error } = await api.DELETE("/categories/{id}", {
    params: { path: { id: categoryId } },
  });

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось удалить категорию"));
  }
};
