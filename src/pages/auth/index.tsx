import { Typography, Image } from "antd";
import { AuthWithGoogle } from "src/features/auth-with-google";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

export default function AuthPage() {
  return (
    <div className={`${styles.container} full-width-container`}>
      <Image
        alt="logo"
        className={`${styles.image}`}
        preview={false}
        src="/banka/images/auth.png"
      />
      <Title level={2} style={{ marginBottom: 0, textAlign: "center", color: "#555555" }}>
        Добро пожаловать в Banka!
      </Title>
      <Text style={{ marginTop: -12 }}>Войдите, чтобы воспользоваться приложением</Text>
      <AuthWithGoogle />
    </div>
  );
}
