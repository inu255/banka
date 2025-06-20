import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "src/shared/config/firebase";
import type { Category } from "src/shared/types";

export const addCategory = async (name: string): Promise<void> => {
  const trimmedName = name.trim();
  if (!trimmedName) {
    throw new Error("Название категории не может быть пустым");
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error("Пользователь не авторизован");
  }

  const ref = collection(db, "users", user.uid, "categories");

  // Проверка на дубликаты
  const q = query(ref, where("name", "==", trimmedName));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error(`Категория "${trimmedName}" уже существует`);
  }

  // Добавление
  await addDoc(ref, { name: trimmedName });
};

export const getCategories = async (): Promise<Category[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const ref = collection(db, "users", user.uid, "categories");
  const q = query(ref, orderBy("name"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};
