import { ExclamationCircleOutlined } from "@ant-design/icons";
import { App, Button, Drawer, Flex, Result } from "antd";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { deleteCategory } from "./api";
import styles from "./styles.module.css";

type Props = { id: string };

export function DeleteCategory({ id }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { message } = App.useApp();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ["categories"] });
      window.location.reload(); // TODO: refetch

      message.open({
        type: "success",
        content: `Продукт удалён`,
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
