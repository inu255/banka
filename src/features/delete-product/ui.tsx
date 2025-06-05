import { useMutation } from "@tanstack/react-query";
import { Button, Drawer, Flex, message } from "antd";
import type { Dispatch, SetStateAction } from "react";

import { deleteProductById } from "./api";
import styles from "./style.module.css";

type Props = { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>>; id: string };

export function DeleteProduct({ isOpen, setIsOpen, id }: Props) {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate, isPending } = useMutation({
    mutationFn: (name: string) => deleteProductById(name),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["brands"] });

      messageApi.open({
        type: "success",
        content: `Продукт удалён`,
      });

      setIsOpen(false);
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: `Ошибка удаления: ${error}`,
      });
    },
  });

  function onClose() {
    setIsOpen(false);
  }

  return (
    <>
      {contextHolder}
      <Drawer
        destroyOnHidden
        title={"Вы действительно хотите удалить продукт?"}
        placement={"bottom"}
        closable={true}
        onClose={onClose}
        open={isOpen}
        height={150}
      >
        <Flex className={styles.container}>
          <Button className={styles.item} onClick={onClose}>
            Нет
          </Button>
          <Button
            className={styles.item}
            danger
            type="primary"
            onClick={() => mutate(id)}
            loading={isPending}
          >
            Да
          </Button>
        </Flex>
      </Drawer>
    </>
  );
}
