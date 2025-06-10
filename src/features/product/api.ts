import type { User } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "src/shared/config/firebase";
import type { Product } from "src/shared/types";

export const getProducts = async (user: User): Promise<Product[]> => {
  const ref = collection(db, "users", user.uid, "products");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Product) }));
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error("Пользователь не авторизован");

  const ref = collection(db, "users", user.uid, "products");

  // Вложенное поле: category.id
  const q = query(ref, where("category.id", "==", categoryId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const addProduct = async (uid: string, product: Omit<Product, "id">): Promise<string> => {
  const ref = collection(db, "users", uid, "products");
  const docRef = await addDoc(ref, product);
  return docRef.id; // возвращаем ID нового продукта
};
