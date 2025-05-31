import { Tabs, type TabsProps } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "src/entities/product-card";
import { db as db2 } from "src/shared/lib/db";

import styles from "./styles.module.css";
import type { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "src/shared/config/firebase";
import { useAuth } from "src/shared/lib/auth";

export const getProducts = async (user: User) => {
  const ref = collection(db, "users", user.uid, "products");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export default function HomePage() {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const categories = useLiveQuery(() => db2.categories.toArray());
  // const products = useLiveQuery(() => db.products.toArray());
  const [products, setProducts] = useState();

  const { user } = useAuth();

  useEffect(() => {
    async function qq() {
      const products11 = user !== null ? await getProducts(user) : [];

      setProducts(products11);
    }

    qq();
  }, []);

  const items: TabsProps["items"] = useMemo(
    () =>
      categories?.map((item) => ({
        key: String(item?.id),
        label: item?.name,
      })),
    [categories]
  );

  console.log(products);

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
