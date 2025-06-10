import { Button, Empty, Spin, Tabs, Typography, type TabsProps } from "antd";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "src/entities/product-card";

import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getCategories } from "src/features/interact-category";
import { getProductsByCategory } from "src/features/product";
import styles from "./styles.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";

export default function HomePage() {
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>();
  const swiperRef = useRef<SwiperType>(null);
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

  useEffect(() => {
    if (categories?.[0]?.key) {
      setActiveTabKey(categories[0].key);
    }
  }, [categories]);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", activeTabKey],
    queryFn: () => getProductsByCategory(activeTabKey as string),
    enabled: isSuccess && Boolean(activeTabKey),
  });

  function handleAddPage() {
    navigate("/add-product");
  }

  function handleSwiperChange(swiper: SwiperType) {
    const newTab = categories?.[swiper.activeIndex];
    if (newTab && newTab.key !== activeTabKey) {
      setActiveTabKey(newTab.key);
    }
  }

  function handleTabChange(key: string) {
    setActiveTabKey(key);
    const index = categories?.findIndex((item) => item.key === key);
    if (swiperRef.current && index !== undefined && index >= 0) {
      swiperRef.current.slideTo(index);
    }
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
        onChange={handleTabChange}
      />

      <Swiper
        className={styles.swiperContainer}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          const index = categories?.findIndex((item) => item.key === activeTabKey);
          if (index !== undefined && index >= 0) swiper.slideTo(index, 0);
        }}
        onSlideChange={handleSwiperChange}
        spaceBetween={10}
      >
        {categories?.map((category) => (
          <SwiperSlide key={category.key}>
            <div className={styles.grid}>
              {activeTabKey === category.key &&
                (products && products.length > 0
                  ? products?.map((product, index) => <ProductCard {...product} key={index} />)
                  : "empty delete")}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
