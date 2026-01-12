import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { ApiError } from "next/dist/server/api-utils";
import { prisma } from "../../../lib/prisma";

import multer from "multer";

export const config = {
  api: {
    bodyParser: false, // Отключаем стандартный парсер тела запросов
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: (error as ApiError).message });
    }
  } else if (req.method === "POST") {
    // Используем multer для обработки загруженных файлов

    const upload = multer({
      storage: multer.diskStorage({
        destination: "./public/uploads/",
        filename: (_, file, cb) => {
          const ext = path.extname(file.originalname);
          const base = path.basename(file.originalname, ext);
          cb(null, `${base}-${Date.now()}${ext}`);
        },
      }),
    }).single("image"); // Ожидаем одно изображение с полем 'image'

    try {
      await upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({ error: err.message });
        } else if (err) {
          return res.status(500).json({ error: err.message });
        }

        const { title, description, price, quantity, category, manufacturer } =
          req.body;

        // Создаем новый продукт с ссылкой на сохраненное изображение
        const newProduct = await prisma.product.create({
          data: {
            title,
            description,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            category,
            manufacturer,
            imageUrl: `/uploads/${req.file.filename}`, // Сохраняем путь к изображению
          },
        });

        res.status(201).json(newProduct);
      });
    } catch (error) {
      res.status(500).json({ error: (error as ApiError).message });
    }
  } else {
    res.status(405).json({ error: "Метод не разрешен" });
  }
}
