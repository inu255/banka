import { Card, Image, Typography } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { db, type Product } from "src/shared/lib/db";

const { Title, Text } = Typography;

export function ProductCard({ brandId, name, image }: Product) {
  const brand = useLiveQuery(() => db.categories.toArray())?.find((item) => item.id === brandId);

  return (
    <Card
      cover={
        <Image
          // className={styles.image}
          style={{ aspectRatio: "1/1" }}
          alt="product"
          src={image}
          preview={false}
        />
      }
    >
      <Title level={4}>{name}</Title>

      <Text>{brand?.name}</Text>
    </Card>
  );
}
