export const getCompressedBase64 = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.match("image.*")) {
      // Если файл не изображение, просто конвертируем в base64 без сжатия
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Рассчитываем новые размеры с сохранением пропорций
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Рисуем изображение с новыми размерами
        ctx?.drawImage(img, 0, 0, width, height);

        // Конвертируем в base64 с заданным качеством
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas toBlob failed"));
              return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
          },
          file.type || "image/jpeg",
          quality
        );
      };

      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
