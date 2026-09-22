import { DatePicker, Form } from "antd";
import type { ProductType } from "src/entities/product";

export function InteractOpenDate() {
  return (
    <Form.Item<ProductType>
      //   label="Название"
      name="openDate"
      rules={[{ required: true, message: "Выбери дату вскрытия!" }]}
    >
      <DatePicker
        style={{ width: "100%" }}
        placeholder="Выбери дату вскрытия"
        format={"DD.MM.YYYY"}
      />
    </Form.Item>
  );
}
