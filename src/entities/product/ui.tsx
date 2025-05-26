import { Image, Space } from "antd";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

type Props = {
  name: ReactNode;
  brand: ReactNode;
  type: ReactNode;
};

export function Product({ name, brand, type }: Props) {
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
        {type}
      </Space>
    </div>
  );
}
