import { useMutation } from "@tanstack/react-query";
import { Button, Form, message, type FormProps } from "antd";

import { Product, type ProductType as ProductForm } from "src/entities/product";
import { InteractBrand } from "src/features/interact-brand";
import { InteractCategory } from "src/features/interact-category";
import { getCompressedBase64, InteractImage } from "src/features/interact-image";
import { InteractName } from "src/features/interact-name";
import { InteractOpenDate } from "src/features/interact-open-date";
import { addProduct } from "src/features/product";
import { useAuth } from "src/shared/lib/auth";
import { type Product as ProductType } from "src/shared/types";

export default function AddProductPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const { user } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: (formValue: Omit<ProductType, "id">) => addProduct(String(user?.uid), formValue),
    onSuccess: () => {
      // console.log(result);
      // queryClient.invalidateQueries({ queryKey: ["brands"] });

      messageApi.open({
        type: "success",
        content: `Бренд успешно добавлен`,
      });
    },
    onError: (error) => {
      console.log(error);

      messageApi.open({
        type: "error",
        content: `Ошибка добавления: ${error}`,
      });
    },
  });

  const onFinish: FormProps<ProductForm>["onFinish"] = async (values) => {
    // console.log("Success:", values);

    mutate({
      brand: {
        id: values.brand.value,
        name: values.brand.label,
      },
      category: {
        id: values.category.value,
        name: values.category.label,
      },
      name: values.name,
      openDate: values.openDate.valueOf(),
      // TODO: нужно хранить сразу в base64, но в инпуте картинки не работает. Надо разобраться и пофиксить
      image: values.image ? await getCompressedBase64(values.image.file) : "",
    });
  };

  return (
    <>
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
          <Button loading={isPending} type="primary" htmlType="submit" style={{ width: "100%" }}>
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
