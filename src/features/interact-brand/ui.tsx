import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, message, Select } from "antd";
import { useState } from "react";
import type { ProductType } from "src/entities/product";
import { Prop } from "src/entities/prop";
import { addBrand, getBrands } from "./api";

export function InteractBrand() {
  const queryClient = useQueryClient();
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: products } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    select: (data) =>
      data.map((item) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (name: string) => addBrand(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });

      messageApi.open({
        type: "success",
        content: `Бренд успешно добавлен`,
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

  return (
    <>
      {contextHolder}
      <Flex gap={8}>
        <Form.Item<ProductType>
          name="brand"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Выбери бренд!" }]}
        >
          <Select labelInValue placeholder="Выбери бренд" options={products} />
        </Form.Item>
        <Button icon={<PlusOutlined />} onClick={() => setIsAddingModalOpen(true)} />
      </Flex>
      <Prop
        isLoading={isPending}
        title="Добавить бренд"
        isOpen={isAddingModalOpen}
        onClose={() => setIsAddingModalOpen(false)}
        onAdd={mutate}
      />
    </>
  );
}
