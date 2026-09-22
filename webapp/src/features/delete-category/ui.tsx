import { ExclamationCircleOutlined } from "@ant-design/icons";
import { App, Button, Drawer, Flex, Result } from "antd";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { deleteCategory } from "./api";
import styles from "./styles.module.css";
import type { Category } from "src/shared/types";

type Props = { id: string };

export function DeleteCategory({ id }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Получаем обновлённые категории
      const categories = queryClient.getQueryData<Category[]>(["categories"]);
      const firstCategoryKey = categories?.[0]?.id || "";

      // Перенаправляем на / с первой категорией
      navigate({ pathname: "/", search: `?tab=${firstCategoryKey}` }, { replace: true });

      message.open({
        type: "success",
        content: `Категория удалена`,
      });

      setIsDrawerOpen(false);
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: `Ошибка удаления: ${error}`,
      });
    },
  });

  function onClose() {
    setIsDrawerOpen(false);
  }
  return (
    <>
      <div className={styles.container}>
        <Result
          icon={<ExclamationCircleOutlined style={{ color: "#e85fed" }} />}
          title="У этой категории нет продуктов"
          extra={
            <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
              Удалить
            </Button>
          }
        />
      </div>
      <Drawer
        destroyOnHidden
        title="Удалить категорию?"
        placement={"bottom"}
        closable={true}
        onClose={onClose}
        open={isDrawerOpen}
        height={150}
      >
        <Flex gap={8}>
          <Button className={styles.button} onClick={() => onClose()}>
            Нет
          </Button>
          <Button
            className={styles.button}
            type="primary"
            danger
            loading={isPending}
            onClick={() => mutate(id)}
          >
            Да
          </Button>
        </Flex>
      </Drawer>
    </>
  );
}
