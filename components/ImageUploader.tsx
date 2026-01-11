import { useState } from "react";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState("");

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return alert("Выберите изображение");

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Отправляем файл на сервер
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageDataUrl(data.imageDataUrl); // Получаем строку изображения от сервера
      } else {
        console.error("Ошибка загрузки изображения");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={uploadImage}>Загрузить изображение</button>
      {imageDataUrl && <img src={imageDataUrl} alt="Uploaded image" />}
    </>
  );
};

export default ImageUploader;
