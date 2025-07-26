import { useMutation } from "@tanstack/react-query";
import { App, Button, Drawer, Flex } from "antd";
import type { Dispatch, SetStateAction } from "react";

import { useNavigate } from "react-router";
import { deleteProductById } from "./api";
import styles from "./style.module.css";

type Props = { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>>; id: string };

export function DeleteProduct({ isOpen, setIsOpen, id }: Props) {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (name: string) => deleteProductById(name),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["brands"] });
      message.open({
        type: "success",
        content: `Продукт удалён`,
      });
      navigate("/", { replace: true });
      setIsOpen(false);
    },
    onError: (error) => {
      message.open({
        type: "error",
        content: `Ошибка удаления: ${error}`,
      });
    },
  });

  function onClose() {
    setIsOpen(false);
  }

  return (
    <Drawer
      destroyOnHidden
      title={"Удалить продукт?"}
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
  );
}
