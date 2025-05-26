import { Button, Form, message, type FormProps } from "antd";
import { Product, type ProductType } from "src/entities/product";
import { InteractBrand } from "src/features/interact-brand";
import { InteractName } from "src/features/interact-name";
import { InteractCategory } from "src/features/interact-category";
import { InteractOpenDate } from "src/features/interact-open-date";
import { db } from "src/shared/lib/db";

export default function AddProduct() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<ProductType>["onFinish"] = async (values) => {
    // open.valueOf();
    console.log("Success:", values);

    try {
      await db.products.add({
        brandId: Number(values.brand),
        name: values.name,
        openDate: values.openDate.valueOf(),
        categoryId: Number(values.category),
      });

      messageApi.open({
        type: "success",
        content: `Продукт ${values.name} успешно добавлен`,
      });
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: "error",
        content: "Ошибка добавления",
      });
    }
  };

  return (
    <div>
      {contextHolder}
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
        <Product
          name={<InteractName />}
          brand={<InteractBrand />}
          category={<InteractCategory />}
          openDate={<InteractOpenDate />}
        />

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
