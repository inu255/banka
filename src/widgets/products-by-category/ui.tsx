import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import type { Dispatch, RefObject, SetStateAction } from "react";
import "swiper/swiper-bundle.css";

import { ProductCard } from "src/entities/product-card";
import { getProductsByCategory } from "src/features/product";
import { LoaderContainer } from "src/shared/ui/loader-container";

import styles from "./styles.module.css";
import { DeleteCategory } from "src/features/delete-category";

type Props = {
  swiperRef: RefObject<SwiperType | null>;
  categories:
    | {
        key: string | undefined;
        label: string;
      }[]
    | undefined;
  activeTabKey: string | undefined;
  setActiveTabKey: Dispatch<SetStateAction<string | undefined>>;
};

export function ProductByCategory({ swiperRef, categories, activeTabKey, setActiveTabKey }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", activeTabKey],
    queryFn: () => getProductsByCategory(activeTabKey as string),
    enabled: Boolean(activeTabKey),
  });

  function handleSwiperChange(swiper: SwiperType) {
    const newTab = categories?.[swiper.activeIndex];
    if (newTab && newTab.key !== activeTabKey) {
      setActiveTabKey(newTab.key);
    }
  }

  if (isLoading) {
    return <LoaderContainer />;
  }

  if (isError) {
    return "error"; // TODO
  }

  return (
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
        <SwiperSlide key={category.key} style={{ overflow: "hidden" }}>
          {data && data.length > 0 ? (
            <div className={styles.grid}>
              {activeTabKey === category.key &&
                data?.map((product, index) => <ProductCard {...product} key={index} />)}
            </div>
          ) : (
            <DeleteCategory id={String(activeTabKey)} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
