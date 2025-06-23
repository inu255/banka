import { useQuery } from "@tanstack/react-query";
import type { RefObject } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { ProductCardView } from "src/entities/product";
import { getProductsByCategory } from "src/features/product";
import { LoaderContainer } from "src/shared/ui/loader-container";

import { useSearchParams } from "react-router";
import { DeleteCategory } from "src/features/delete-category";
import styles from "./styles.module.css";

type Props = {
  swiperRef: RefObject<SwiperType | null>;
  categories:
    | {
        key: string | undefined;
        label: string;
      }[]
    | undefined;
};

export function ProductByCategory({ swiperRef, categories }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTabKey = searchParams.get("tab");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", activeTabKey],
    queryFn: () => getProductsByCategory(activeTabKey as string),
    enabled: Boolean(activeTabKey),
  });

  function handleSwiperChange(swiper: SwiperType) {
    const newTab = categories?.[swiper.activeIndex];
    if (newTab && newTab.key !== activeTabKey) {
      setSearchParams({ tab: String(newTab.key) });
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
        <SwiperSlide key={category.key} className={styles.swiperSlide}>
          {data && data.length > 0 ? (
            <div className={styles.grid}>
              {activeTabKey === category.key &&
                data?.map((product, index) => <ProductCardView {...product} key={index} />)}
            </div>
          ) : (
            <DeleteCategory id={String(activeTabKey)} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
