import { api, apiErrorMessage, type Brand } from "src/shared/api";

export const addBrand = async (name: string): Promise<void> => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Название бренда не может быть пустым");
  }

  // Проверку на дубликаты и добавление делает бэкенд (POST /brands).
  const { error } = await api.POST("/brands", { body: { name: trimmedName } });

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось добавить бренд"));
  }
};

export const getBrands = async (): Promise<Brand[]> => {
  const { data, error } = await api.GET("/brands");

  if (error) {
    throw new Error(apiErrorMessage(error, "Не удалось загрузить бренды"));
  }

  return data;
};
