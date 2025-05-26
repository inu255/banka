import type { ComponentProps } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, theme, Typography } from "antd";
import { useNavigate } from "react-router";
import styles from "./styles.module.css";

export function Header({ ...props }: ComponentProps<"div">) {
  const { useToken } = theme;
  const { token } = useToken();
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/add-product");
  }

  return (
    <div {...props}>
      <Flex className={styles.header} justify="space-between" align="center">
        <Typography.Title level={2} style={{ color: token.colorPrimary, marginBottom: 0 }}>
          BANKA
        </Typography.Title>
        <Button shape="circle" icon={<PlusOutlined />} onClick={handleNavigate} />
      </Flex>
    </div>
  );
}
