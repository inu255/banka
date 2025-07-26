import { Button, Avatar, Typography } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "src/shared/config/firebase";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

export default function ProfilePage() {
  const user = auth.currentUser;

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "?";
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileInfo}>
        <Avatar size={96} className={styles.avatar}>
          {getInitials()}
        </Avatar>
        <Title level={3} className={styles.title}>
          {user?.displayName || "Без имени"}
        </Title>
        <Text type="secondary" className={styles.email}>
          {user?.email || "Нет email"}
        </Text>
      </div>
      <Button
        type="primary"
        danger
        block
        size="large"
        className={styles.logoutBtn}
        onClick={signOutUser}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
}
