import { Space } from "antd";
import type { ReactNode } from "react";

type Props = {
  name: ReactNode;
  brand: ReactNode;
  category: ReactNode;
  openDate: ReactNode;
  comment?: ReactNode;
  image?: ReactNode;
};

export function ProductPageView({ name, brand, category, openDate, comment, image }: Props) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {image}
      {name}
      {brand}
      {category}
      {openDate}
      {comment}
    </Space>
  );
}
