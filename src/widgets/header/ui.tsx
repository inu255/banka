import { Button, Flex, theme, Typography } from "antd";
import type { ComponentProps } from "react";
import { useNavigate } from "react-router";
import styles from "./styles.module.css";
import { SearchOutlined } from "@ant-design/icons";

export function Header({ ...props }: ComponentProps<"div">) {
  const { useToken } = theme;
  const { token } = useToken();
  const navigate = useNavigate();

  function handleSearch() {
    navigate("/search");
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
        <Button
          icon={<SearchOutlined />}
          disabled
          type="text"
          onClick={handleSearch}
          shape="circle"
          size="large"
        />
      </Flex>
    </header>
  );
}
