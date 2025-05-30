import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, message, Select } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import type { ProductType } from "src/entities/product";
import { Prop } from "src/entities/prop";
import { db } from "src/shared/lib/db";

export function InteractBrand() {
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const brands = useLiveQuery(() => db.brands.toArray());
  const [messageApi, contextHolder] = message.useMessage();

  const transformedBrands = useMemo(
    () =>
      brands?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [brands]
  );

  async function createBrand(brand: string) {
    try {
      await db.brands.add({ name: brand });

      messageApi.open({
        type: "success",
        content: `Бренд ${brand} успешно добавлен`,
      });
      setIsAddingModalOpen(false);
    } catch (error) {
      console.error(error);
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
          name="brand"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Выбери бренд!" }]}
        >
          <Select
            // style={{ width: 120 }}
            placeholder="Выбери бренд"
            options={transformedBrands}
          />
        </Form.Item>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddingModalOpen(true)} />
      </Flex>
      <Prop
        title="Добавить бренд"
        isOpen={isAddingModalOpen}
        onClose={() => setIsAddingModalOpen(false)}
        onAdd={createBrand}
      />
    </div>
  );
}
