import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Select } from "antd";
import type { ProductType } from "src/entities/product";

export function InteractType() {
  return (
    <Flex gap={8}>
      <Form.Item<ProductType>
        //   label="Название"
        name="type"
        style={{ flex: 1 }}

        //   rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Select
          // style={{ width: 120 }}
          placeholder="Выбери тип"
          options={[
            { value: "1", label: "Type 1" },
            { value: "2", label: "Type 2" },
            { value: "3", label: "Type 3" },
          ]}
        />
      </Form.Item>
      <Button type="primary" icon={<PlusOutlined />} />
    </Flex>
  );
}
