import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, message, Select } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import type { ProductType } from "src/entities/product";
import { Prop } from "src/entities/prop";
import { db } from "src/shared/lib/db";

export function InteractCategory() {
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const categories = useLiveQuery(() => db.categories.toArray());
  const [messageApi, contextHolder] = message.useMessage();

  const transformedCategories = useMemo(
    () =>
      categories?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [categories]
  );

  async function createCategory(category: string) {
    try {
      await db.categories.add({ name: category });

      messageApi.open({
        type: "success",
        content: `Категория ${category} успешно добавлен`,
      });
      setIsAddingModalOpen(false);
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Ошибка добавления",
      });
    }
  }

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
          <Select placeholder="Выбери категорию" options={transformedCategories} />
        </Form.Item>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddingModalOpen(true)} />
      </Flex>
      <Prop
        title="Добавить категорию"
        isOpen={isAddingModalOpen}
        onClose={() => setIsAddingModalOpen(false)}
        onAdd={createCategory}
      />
    </div>
  );
}
