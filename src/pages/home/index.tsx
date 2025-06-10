import { Button, Empty, Spin, Tabs, Typography, type TabsProps } from "antd";
import { useEffect, useRef, useState } from "react";

import type { Swiper as SwiperType } from "swiper";

import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getCategories } from "src/features/interact-category";
import { ProductByCategory } from "src/widgets/products-by-category";
import styles from "./styles.module.css";

export default function HomePage() {
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>();
  const swiperRef = useRef<SwiperType>(null);
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading: isLoadingCategories,
    // isSuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        label: item.name,
      })),
  });

  useEffect(() => {
    if (categories?.[0]?.key) {
      setActiveTabKey(categories[0].key);
    }
  }, [categories]);

  function handleAddPage() {
    navigate("/add-product");
  }

  function handleTabChange(key: string) {
    setActiveTabKey(key);
    const index = categories?.findIndex((item) => item.key === key);
    if (swiperRef.current && index !== undefined && index >= 0) {
      swiperRef.current.slideTo(index);
    }
  }

  if (isLoadingCategories) {
    return <Spin size="large" fullscreen />;
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
        tabBarStyle={{ marginBottom: 0, padding: "0" }}
        className={styles.tabs}
        activeKey={activeTabKey}
        items={categories as TabsProps["items"]}
        onChange={handleTabChange}
      />

      <ProductByCategory
        activeTabKey={activeTabKey}
        categories={categories}
        swiperRef={swiperRef}
        setActiveTabKey={setActiveTabKey}
      />
    </div>
  );
}
