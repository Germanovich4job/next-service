import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Получаем строку изображения из тела запроса
      const { imageDataUrl } = req.body;

      if (!imageDataUrl) {
        return res.status(400).json({ error: "Нет данных изображения" });
      }

      // Создаем запись в базе данных
      const newImage = await prisma.image.create({
        data: {
          dataUri: imageDataUrl,
        },
      });

      // Возвращаем результат клиенту
      res.status(201).json({ message: "Изображение успешно загружено" });
    } catch (error) {
      res.status(500).json({ error: (error as ApiError).message });
    }
  } else {
    res.status(405).json({ error: "Метод не разрешен" });
  }
}
