import { Button, Form, type FormProps } from "antd";
import { Product, type ProductType } from "src/entities/product";
import { InteractBrand } from "src/features/interact-brand";
import { InteractName } from "src/features/interact-name";
import { InteractType } from "src/features/interact-type";

export default function AddProduct() {
  const onFinish: FormProps<ProductType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Form
        name="product"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Product name={<InteractName />} brand={<InteractBrand />} type={<InteractType />} />

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
