import { PlusOutlined } from "@ant-design/icons";
import { Form, Typography, Upload, Image } from "antd";

import styles from "./styles.module.css";
import { useState } from "react";
import { getCompressedBase64 } from "./lib";

export function InteractImage() {
  const form = Form.useFormInstance();
  const [imageUrl, setImageUrl] = useState<string>();

  const handleBeforeUpload = async (file: File) => {
    const base64 = await getCompressedBase64(file);
    form.setFieldsValue({ image: file });
    setImageUrl(base64);
    return false;
  };

  return (
    <Form.Item
      name="image"
      rules={[{ required: true, message: "Пожалуйста, загрузите изображение!" }]}
    >
      <Upload beforeUpload={handleBeforeUpload} showUploadList={false} style={{ width: "100%" }}>
        <div className={styles.uploadArea}>
          {imageUrl === undefined ? (
            <>
              {" "}
              <PlusOutlined style={{ fontSize: 50 }} />
              <Typography.Text className={styles.buttonText}>Загрузить</Typography.Text>
            </>
          ) : (
            <Image alt="product" className={styles.preview} src={imageUrl} preview={false} />
          )}
        </div>
      </Upload>
    </Form.Item>
  );
}
