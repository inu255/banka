import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Image, Space, Spin, Typography } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { useState } from "react";

import { getProductById, ProductPageView as ProductEntity } from "src/entities/product";
import { DeleteProduct } from "src/features/delete-product";
import { useAuth } from "src/shared/lib/auth";
import styles from "./styles.module.css";

const { Text, Title } = Typography;

export default function ProductPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => user && getProductById(String(id), user),
    enabled: user !== null && id !== undefined,
  });

  if (isLoading && id !== undefined) {
    return <Spin size="large" fullscreen />;
  }

  return (
    <>
      <Space className={styles.container} direction="vertical">
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
              <Text className={styles.text}>{product?.brand.name}</Text>
            </div>
          }
          category={
            <div>
              <Title style={{ marginBottom: 0 }} level={4}>
                Категория
              </Title>
              <Text className={styles.text}>{product?.category.name}</Text>
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
          <Button className={styles.actionButton} disabled type="primary">
            Редактировать
          </Button>
          <Button className={styles.actionButton} danger onClick={() => setIsDeleteModalOpen(true)}>
            Удалить
          </Button>
        </Flex>
      </Space>

      <DeleteProduct isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} id={String(id)} />
    </>
  );
}
