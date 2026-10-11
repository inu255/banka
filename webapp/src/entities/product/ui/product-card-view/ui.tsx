import { Card, Image, Typography } from "antd";
import { useNavigate } from "react-router";
import type { ProductShort } from "src/shared/api";
import styles from "./styles.module.css";

const { Title, Text } = Typography;

export function ProductCardView({ brand, name, image, id }: ProductShort) {
  const navigate = useNavigate();

  return (
    <Card
      cover={<Image className={styles.image} alt="product" src={image ?? undefined} preview={false} />}
      onClick={() => navigate(`/product/${id}`)}
      size="small"
    >
      <Title ellipsis={{ rows: 2 }} level={4}>
        {name}
      </Title>

      <Text>{brand?.name}</Text>
    </Card>
  );
}
