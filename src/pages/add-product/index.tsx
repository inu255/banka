import { Button, Form, message, type FormProps } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { Product, type ProductType } from "src/entities/product";
import { InteractBrand } from "src/features/interact-brand";
import { InteractCategory } from "src/features/interact-category";
import { InteractImage } from "src/features/interact-image";
import { getCompressedBase64 } from "src/features/interact-image";
import { InteractName } from "src/features/interact-name";
import { InteractOpenDate } from "src/features/interact-open-date";
import { db } from "src/shared/config/firebase";
import { useAuth } from "src/shared/lib/auth";
// import { db } from "src/shared/lib/db";

import { type Product as ProductGlobal } from "src/shared/types";

const addProduct = async (uid: string, product: Omit<ProductGlobal, "id">) => {
  const ref = collection(db, "users", uid, "products");
  const docRef = await addDoc(ref, product);
  return docRef.id;
};

export default function AddProductPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const { user } = useAuth();
  console.log(user);

  const onFinish: FormProps<ProductType>["onFinish"] = async (values) => {
    // open.valueOf();
    // console.log("Success:", values);

    console.log(values);

    try {
      // await db.products.add({
      //   brandId: Number(values.brand),
      //   name: values.name,
      //   openDate: values.openDate.valueOf(),
      //   categoryId: Number(values.category),
      //   // TODO: нужно хранить сразу в base64, но в инпуте картинки не работает. Надо разобраться и пофиксить
      //   image: values.image ? await getCompressedBase64(values.image.file) : "",
      // });

      await addProduct(String(user?.uid), {
        brandId: Number(values.brand),
        name: values.name,
        openDate: values.openDate.valueOf(),
        categoryId: Number(values.category),
        // TODO: нужно хранить сразу в base64, но в инпуте картинки не работает. Надо разобраться и пофиксить
        image: values.image ? await getCompressedBase64(values.image.file) : "",
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
        initialValues={{}}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Product
          image={<InteractImage />}
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
