import { Form, Input } from "antd";
import type { ProductType } from "src/entities/product";

export function InteractComment() {
  return (
    <Form.Item<ProductType> name="comment">
      <Input.TextArea
        autoSize={{ minRows: 2, maxRows: 3 }}
        maxLength={500}
        placeholder="Комментарий (необязательно)"
      />
    </Form.Item>
  );
}
