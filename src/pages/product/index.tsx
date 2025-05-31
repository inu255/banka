import { useEffect, useState } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import { db, type Product } from "src/shared/lib/db";
import { Button, Flex, Image, Space, Typography } from "antd";
import { Product as ProductEntity } from "src/entities/product";

import styles from "./styles.module.css";

const { Text, Title } = Typography;

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  console.log(product);

  useEffect(() => {
    db.products.get(Number(id)).then((value) => setProduct(value));
  }, [id]);

  return (
    <Space direction="vertical">
      <ProductEntity
        image={<Image alt="product" className={styles.image} src={product?.image} />}
        name={
          <div>
            <Title style={{ marginBottom: 0 }} level={4}>
              Название
            </Title>
            <Text className={styles.text}>{product?.name}</Text>
          </div>
        }
        brand={
          <div>
            <Title style={{ marginBottom: 0 }} level={4}>
              Бренд
            </Title>
            <Text className={styles.text}>{product?.brandId}</Text>
          </div>
        }
        category={
          <div>
            <Title style={{ marginBottom: 0 }} level={4}>
              Категория
            </Title>
            <Text className={styles.text}>{product?.categoryId}</Text>
          </div>
        }
        openDate={
          <div>
            <Title style={{ marginBottom: 0 }} level={4}>
              Дата вскрытия
            </Title>
            <Text className={styles.text}>{dayjs(product?.openDate).format("DD.MM.YYYY")}</Text>
          </div>
        }
      />

      <Flex justify="space-between" gap="small">
        <Button className={styles.actionButton} type="primary">
          Редактировать
        </Button>
        <Button className={styles.actionButton} danger>
          Удалить
        </Button>
      </Flex>
    </Space>
  );
}
