import { api, apiErrorMessage, type Category } from "src/shared/api";

export const addCategory = async (name: string): Promise<void> => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Название категории не может быть пустым");
  }

  // Проверку на дубликаты и добавление делает бэкенд (POST /categories).
  const { error } = await api.POST("/categories", { body: { name: trimmedName } });

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось создать категорию"));
  }
};

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await api.GET("/categories");

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось загрузить категории"));
  }

  return data;
};
