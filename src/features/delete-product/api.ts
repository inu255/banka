import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "src/shared/config/firebase";

export const deleteProductById = async (productId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  const productRef = doc(db, "users", user.uid, "products", productId);

  try {
    await deleteDoc(productRef);
    console.log(`Product "${productId}" deleted`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
