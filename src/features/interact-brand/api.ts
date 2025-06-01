import { collection, query, where, getDocs, addDoc, orderBy } from "firebase/firestore";
import { db } from "src/shared/config/firebase";
import type { Brand } from "src/shared/types";

export const addBrand = async (name: string): Promise<void> => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Название бренда не может быть пустым");
  }

  // Проверка на дубликаты по имени
  const q = query(collection(db, "brands"), where("name", "==", trimmedName));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error(`Бренд "${trimmedName}" уже существует`);
  }

  // Добавление нового бренда
  await addDoc(collection(db, "brands"), {
    name: trimmedName,
  });
};

export const getBrands = async (): Promise<Brand[]> => {
  const q = query(collection(db, "brands"), orderBy("name"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};
