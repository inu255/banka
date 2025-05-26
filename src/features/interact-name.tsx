import { Form, Input } from "antd";
import type { ProductType } from "src/entities/product";

export function InteractName() {
  return (
    <Form.Item<ProductType>
      //   label="Название"
      name="name"
      //   rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input placeholder="Введи название" />
    </Form.Item>
  );
}
