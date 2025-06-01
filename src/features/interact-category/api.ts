import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "src/shared/config/firebase";
import type { Category } from "src/shared/types";

export const addCategory = async (name: string): Promise<void> => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Название категории не может быть пустой");
  }

  // Проверка на дубликаты по имени
  const q = query(collection(db, "categories"), where("name", "==", trimmedName));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error(`Категория "${trimmedName}" уже существует`);
  }

  // Добавление нового бренда
  await addDoc(collection(db, "categories"), {
    name: trimmedName,
  });
};

export const getCategories = async (): Promise<Category[]> => {
  const q = query(collection(db, "categories"), orderBy("name"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};
