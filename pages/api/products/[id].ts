import prisma from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });
      if (!product) return res.status(404).json({ error: "Продукт не найден" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "PATCH") {
    const {
      title,
      description,
      price,
      quantity,
      category,
      manufacturer,
      imageUrl,
    } = req.body;
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          price,
          quantity,
          category,
          manufacturer,
          imageUrl,
        },
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    console.log(req.method);
    try {
      const x = await prisma.product.delete({ where: { id: Number(id) } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Метод не разрешен" });
  }
}
