import { Typography } from "antd";
import { AuthWithGoogle } from "src/features/auth-with-google";

export default function AuthPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Typography.Title>Авторизация</Typography.Title>
      <AuthWithGoogle />
    </div>
  );
}
