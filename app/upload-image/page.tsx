"use client";
import { useState } from "react";

const ImageUploader = () => {
  const [imageBase64, setImageBase64] = useState("");

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageBase64(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageBase64) return alert("Выберите изображение");

    try {
      // Отправляем строку изображения на сервер
      const response = await fetch("/api/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageDataUrl: imageBase64 }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Изображение успешно загружено:", data);
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
      {imageBase64 && <img src={imageBase64} alt="Uploaded image" />}
    </>
  );
};

export default ImageUploader;
