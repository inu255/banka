import { Tabs, type TabsProps } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import { ProductCard } from "src/entities/product-card";
import { db } from "src/shared/lib/db";

import styles from "./styles.module.css";

export default function Home() {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const categories = useLiveQuery(() => db.categories.toArray());
  const products = useLiveQuery(() => db.products.toArray());

  const items: TabsProps["items"] = useMemo(
    () =>
      categories?.map((item) => ({
        key: String(item.id),
        label: item.name,
      })),
    [categories]
  );

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
