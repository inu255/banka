import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Select } from "antd";
import type { ProductType } from "src/entities/product";

export function InteractBrand() {
  return (
    <Flex gap={8}>
      <Form.Item<ProductType>
        //   label="Название"
        name="brand"
        style={{ flex: 1 }}

        //   rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Select
          // style={{ width: 120 }}
          placeholder="Выбери бренд"
          options={[
            { value: "1", label: "Brand 1" },
            { value: "2", label: "Brand 2" },
            { value: "3", label: "Brand 3" },
          ]}
        />
      </Form.Item>
      <Button type="primary" icon={<PlusOutlined />} />
    </Flex>
  );
}
