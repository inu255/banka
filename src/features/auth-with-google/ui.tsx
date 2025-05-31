import { Button } from "antd";
import { useNavigate } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "src/shared/config/firebase";

export const AuthWithGoogle = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      navigate("/");
      return user;
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Ошибка"); // TODO
      throw error;
    }
  };

  return (
    <Button type="primary" onClick={signInWithGoogle}>
      Войти через Google
    </Button>
  );
};
