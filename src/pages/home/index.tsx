import { Button, Empty, Spin, Tabs, Typography, type TabsProps } from "antd";
import { useEffect, useState } from "react";
import { ProductCard } from "src/entities/product-card";

import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getCategories } from "src/features/interact-category";
import { getProductsByCategory } from "src/features/product";
import styles from "./styles.module.css";

export default function HomePage() {
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>();
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isSuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        label: item.name,
      })),
  });

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", activeTabKey],
    queryFn: () => getProductsByCategory(activeTabKey as string),
    enabled: isSuccess && Boolean(activeTabKey),
  });

  console.log(categories, activeTabKey, products);

  useEffect(() => {
    if (categories?.[0]?.key) {
      setActiveTabKey(categories[0].key);
    }
  }, [categories]);

  function handleAddPage() {
    navigate("/add-product");
  }

  if (isLoading && isLoadingCategories) {
    return <Spin size="large" fullscreen />;
  }

  if (isError) {
    return "error"; // TODO
  }

  if (categories?.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty description={<Typography.Text>Ничего пока нет</Typography.Text>}>
          <Button icon={<PlusOutlined />} type="primary" onClick={handleAddPage}>
            Добавить
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Tabs
        tabBarStyle={{ marginBottom: 0, padding: "0 15px" }}
        className={styles.tabs}
        activeKey={activeTabKey}
        items={categories as TabsProps["items"]}
        onChange={(value) => setActiveTabKey(value)}
      />

      <div className={styles.grid}>
        {products?.map((product, index) => (
          <ProductCard {...product} key={index} />
        ))}
      </div>
    </div>
  );
}
