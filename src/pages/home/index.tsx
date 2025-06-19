import { Button, Empty, Spin, Tabs, Typography, type TabsProps } from "antd";
import { useEffect, useRef } from "react";

import type { Swiper as SwiperType } from "swiper";

import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { getCategories } from "src/features/interact-category";
import { ProductByCategory } from "src/widgets/products-by-category";
import styles from "./styles.module.css";

export default function HomePage() {
  const swiperRef = useRef<SwiperType>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabKey = searchParams.get("tab");

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) =>
      data.map((item) => ({
        key: item.id,
        label: item.name,
      })),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!activeTabKey && categories?.[0]?.key) {
      setSearchParams({ tab: categories[0].key });
    }
  }, [categories, activeTabKey, setSearchParams]);

  function handleAddPage() {
    navigate("/add-product");
  }

  function handleTabChange(key: string) {
    setSearchParams({ tab: key });

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
        activeKey={activeTabKey ?? categories?.[0]?.key}
        items={categories as TabsProps["items"]}
        onChange={handleTabChange}
      />

      <ProductByCategory categories={categories} swiperRef={swiperRef} />
    </div>
  );
}
