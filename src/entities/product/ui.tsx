import { Space } from "antd";
import type { ReactNode } from "react";

type Props = {
  name: ReactNode;
  brand: ReactNode;
  category: ReactNode;
  openDate: ReactNode;
  image?: ReactNode;
};

export function Product({ name, brand, category, openDate, image }: Props) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {image}
      {name}
      {brand}
      {category}
      {openDate}
    </Space>
  );
}
