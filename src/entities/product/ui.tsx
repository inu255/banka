import { Image, Space } from "antd";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

type Props = {
  name: ReactNode;
  brand: ReactNode;
  category: ReactNode;
  openDate: ReactNode;
};

export function Product({ name, brand, category, openDate }: Props) {
  return (
    <div>
      <Space direction="vertical">
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            alt="product"
            src="https://placehold.co/450"
            preview={false}
          />
        </div>

        {name}
        {brand}
        {category}
        {openDate}
      </Space>
    </div>
  );
}
