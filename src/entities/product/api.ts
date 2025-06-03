import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/shared/config/firebase";
import type { Product } from "src/shared/types";

export const getProductById = async (productId: string, user: User): Promise<Product> => {
  if (!user) throw new Error("User is not authenticated");

  const ref = doc(db, "users", user.uid, "products", productId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error("Product not found");
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Product;
};
