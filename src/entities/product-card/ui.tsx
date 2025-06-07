import { Card, Image, Typography } from "antd";
import { useNavigate } from "react-router";
import type { Product } from "src/shared/types";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

export function ProductCard({ brand, name, image, id }: Product) {
  const navigate = useNavigate();

  return (
    <Card
      cover={<Image className={styles.image} alt="product" src={image} preview={false} />}
      onClick={() => navigate(`/product/${id}`)}
    >
      <Title ellipsis={{ rows: 2 }} level={4}>
        {name}
      </Title>

      <Text>{brand?.name}</Text>
    </Card>
  );
}
