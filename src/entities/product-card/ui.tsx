import { Card, Image, Typography } from "antd";
import { useNavigate } from "react-router";
import type { Product } from "src/shared/types";

const { Title, Text } = Typography;

export function ProductCard({ brand, name, image, id }: Product) {
  const navigate = useNavigate();

  return (
    <Card
      cover={<Image style={{ aspectRatio: "1/1" }} alt="product" src={image} preview={false} />}
      onClick={() => navigate(`/product/${id}`)}
    >
      <Title level={4}>{name}</Title>

      <Text>{brand?.name}</Text>
    </Card>
  );
}
