import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "src/shared/config/firebase";

export const deleteCategory = async (categoryId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Пользователь не авторизован");
  }

  const ref = doc(db, "users", user.uid, "categories", categoryId);
  await deleteDoc(ref);
};
