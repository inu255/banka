import { Spin, Tabs, type TabsProps } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import { ProductCard } from "src/entities/product-card";
import { db as db2 } from "src/shared/lib/db";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "src/features/product";
import { useAuth } from "src/shared/lib/auth";
import styles from "./styles.module.css";

export default function HomePage() {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const categories = useLiveQuery(() => db2.categories.toArray());

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

  const items: TabsProps["items"] = useMemo(
    () =>
      categories?.map((item) => ({
        key: String(item?.id),
        label: item?.name,
      })),
    [categories]
  );

  if (isLoading) {
    return <Spin size="large" fullscreen />;
  }

  if (isError) {
    return "error"; // TODO
  }

  return (
    <div className={styles.container}>
      <Tabs
        tabBarStyle={{ marginBottom: 0, padding: "0 15px" }}
        className={styles.tabs}
        defaultActiveKey="1"
        activeKey={activeTabKey}
        items={items}
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
