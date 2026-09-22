import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App, Button, Flex, Form } from "antd";
import { useState } from "react";
import type { ProductType } from "src/entities/product";
import { Prop } from "src/entities/prop";
import { BottomSheetSelect } from "src/shared/ui/bottom-sheet-select";
import { addCategory, getCategories } from "./api";

export function InteractCategory() {
  const queryClient = useQueryClient();
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const { message } = App.useApp();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) =>
      data.map((item) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (name: string) => addCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      message.open({
        type: "success",
        content: `Категория успешно создана`,
      });

      setIsAddingModalOpen(false);
    },
    onError: (error) => {
      console.log(error);

      message.open({
        type: "error",
        content: `Ошибка добавления: ${error}`,
      });
    },
  });

  return (
    <>
      <Flex gap={8}>
        <Form.Item<ProductType>
          //   label="Название"
          name="category"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Выбери категорию!" }]}
        >
          <BottomSheetSelect placeholder="Выбери категорию" options={categories} />
        </Form.Item>
        <Button icon={<PlusOutlined />} onClick={() => setIsAddingModalOpen(true)} />
      </Flex>
      <Prop
        isLoading={isPending}
        title="Добавить категорию"
        isOpen={isAddingModalOpen}
        onClose={() => setIsAddingModalOpen(false)}
        onAdd={mutate}
      />
    </>
  );
}
