import { Button, Drawer, Flex, Input } from "antd";
import { useState } from "react";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (value: string) => void;
};

export function Prop({ title, isOpen, onClose, onAdd }: Props) {
  const [value, setValue] = useState("");

  return (
    <Drawer
      destroyOnHidden
      title={title}
      placement={"bottom"}
      closable={true}
      onClose={onClose}
      open={isOpen}
      height={150}
    >
      <Flex gap={8}>
        <Input
          style={{ flex: 1 }}
          value={value}
          placeholder="Введи название"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="primary" onClick={() => onAdd(value)}>
          Добавить
        </Button>
      </Flex>
    </Drawer>
  );
}
