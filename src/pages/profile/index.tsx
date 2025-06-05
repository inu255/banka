import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "src/shared/config/firebase";

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

export default function ProfilePage() {
  return (
    <div>
      <Button onClick={signOutUser}>Выход</Button>
    </div>
  );
}
