import type { ComponentProps } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, theme, Typography } from "antd";
import { useNavigate } from "react-router";
import styles from "./styles.module.css";

export function Header({ ...props }: ComponentProps<"div">) {
  const { useToken } = theme;
  const { token } = useToken();
  const navigate = useNavigate();

  function handleAddPage() {
    navigate("/add-product");
  }

  function handleHomePage() {
    navigate("/");
  }

  return (
    <header {...props} className={styles.header}>
      <Flex justify="space-between" align="center">
        <Typography.Title
          level={2}
          style={{ color: token.colorPrimary, marginBottom: 0 }}
          onClick={handleHomePage}
        >
          BANKA
        </Typography.Title>
        <Button icon={<PlusOutlined />} type="link" onClick={handleAddPage}>
          Добавить
        </Button>
      </Flex>
    </header>
  );
}
