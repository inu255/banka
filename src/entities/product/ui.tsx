import { Space } from "antd";
import type { ReactNode } from "react";

// import styles from "./styles.module.css";
// import { InteractImage } from "src/features/interact-image";

type Props = {
  name: ReactNode;
  brand: ReactNode;
  category: ReactNode;
  openDate: ReactNode;
  image?: ReactNode;
};

export function Product({ name, brand, category, openDate, image }: Props) {
  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            alt="product"
            src="https://placehold.co/450"
            preview={false}
          />
        </div> */}

        {image}
        {name}
        {brand}
        {category}
        {openDate}
      </Space>
    </div>
  );
}
