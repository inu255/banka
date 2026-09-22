import { useMutation } from "@tanstack/react-query";
import { App, Button, Form, type FormProps } from "antd";
import { useNavigate } from "react-router";

import { ProductPageView, type ProductType as ProductForm } from "src/entities/product";
import { InteractBrand } from "src/features/interact-brand";
import { InteractCategory } from "src/features/interact-category";
import { getCompressedBase64, InteractImage } from "src/features/interact-image";
import { InteractName } from "src/features/interact-name";
import { InteractOpenDate } from "src/features/interact-open-date";
import { addProduct } from "src/features/product";
import { useAuth } from "src/shared/lib/auth";
import { type Product as ProductType } from "src/shared/types";

export default function AddProductPage() {
  const { message } = App.useApp();

  const [form] = Form.useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (formValue: Omit<ProductType, "id">) => addProduct(String(user?.uid), formValue),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["brands"] });
      message.open({
        type: "success",
        content: `Продукт успешно добавлен`,
      });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.log(error);

      message.open({
        type: "error",
        content: `Ошибка добавления: ${error}`,
      });
    },
  });

  const onFinish: FormProps<ProductForm>["onFinish"] = async (values) => {
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
    <Form name="product" initialValues={{}} onFinish={onFinish} autoComplete="off" form={form}>
      <ProductPageView
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
  );
}
