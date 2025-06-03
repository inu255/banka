import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, message, Select } from "antd";
import { useState } from "react";
import type { ProductType } from "src/entities/product";
import { Prop } from "src/entities/prop";
import { addCategory, getCategories } from "./api";

export function InteractCategory() {
  const queryClient = useQueryClient();
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  // const categories = useLiveQuery(() => db.categories.toArray());
  const [messageApi, contextHolder] = message.useMessage();

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

      messageApi.open({
        type: "success",
        content: `Категория успешно создана`,
      });

      setIsAddingModalOpen(false);
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: `Ошибка добавления: ${error}`,
      });
    },
  });

  // async function createCategory(category: string) {
  //   try {
  //     await db.categories.add({ name: category });

  //     messageApi.open({
  //       type: "success",
  //       content: `Категория ${category} успешно добавлен`,
  //     });
  //     setIsAddingModalOpen(false);
  //   } catch (error) {
  //     console.log(error);
  //     messageApi.open({
  //       type: "error",
  //       content: "Ошибка добавления",
  //     });
  //   }
  // }

  return (
    <div>
      {contextHolder}

      <Flex gap={8}>
        <Form.Item<ProductType>
          //   label="Название"
          name="category"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Выбери категорию!" }]}
        >
          <Select labelInValue placeholder="Выбери категорию" options={categories} />
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
    </div>
  );
}
