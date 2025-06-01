import { Spin, Tabs, type TabsProps } from "antd";
import { useEffect, useState } from "react";
import { ProductCard } from "src/entities/product-card";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "src/features/interact-category";
import { getProducts } from "src/features/product";
import { useAuth } from "src/shared/lib/auth";
import styles from "./styles.module.css";

export default function HomePage() {
  const [activeTabKey, setActiveTabKey] = useState<string>("1");

  const { user } = useAuth();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => user && getProducts(user),
    enabled: user !== null,
  });

  const { data: categories, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        label: item.name,
      })),
  });

  useEffect(() => {
    if (categories?.[0].key) {
      setActiveTabKey(categories[0].key);
    }
  }, [categories]);

  if (isLoading && isLoadingProducts) {
    return <Spin size="large" fullscreen />;
  }

  if (isError) {
    return "error"; // TODO
  }

  if (products?.length === 0) {
    return "Ничего не найдено";
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
        {products
          ?.filter((product) => String(product.categoryId) === activeTabKey)
          .map((product, index) => (
            <ProductCard {...product} key={index} />
          ))}
      </div>
    </div>
  );
}
