import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";

export function InteractImage() {
  const form = Form.useFormInstance();

  const handleBeforeUpload = async (file: File) => {
    form.setFieldsValue({ image: file });
    return false;
  };

  return (
    <Form.Item
      name="image"
      rules={[{ required: true, message: "Пожалуйста, загрузите изображение!" }]}
    >
      <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
      </Upload>
    </Form.Item>
  );
}
