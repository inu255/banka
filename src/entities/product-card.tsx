import { Card, Image, Typography } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router";
import { db, type Product } from "src/shared/lib/db";

const { Title, Text } = Typography;

export function ProductCard({ brandId, name, image, id }: Product) {
  const brand = useLiveQuery(() => db.categories.toArray())?.find((item) => item.id === brandId);
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
