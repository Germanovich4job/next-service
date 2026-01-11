"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Card,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "@/services/productsApi";

const ProductList = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();
  const { data: products, isError } = useGetAllProductsQuery(); // получаем список товаров

  const handleAddProduct = () => {
    const newProduct = {
      title: document.querySelector("#title-input")!.value.trim(), // получаем значение поля Title
      description: document.querySelector("#description-input")!.value.trim(), // получаем значение Description
      price: Number(document.querySelector("#price-input")!.value.trim()), // получаем число Price
      quantity: Number(document.querySelector("#quantity-input")!.value.trim()), // получаем число Quantity
      category: document.querySelector("#category-input")!.value.trim(), // получаем категорию
      manufacturer: document.querySelector("#manufacturer-input")!.value.trim(), // получаем производителя
      imageUrl: document.querySelector("#image-url-input")!.value.trim(), // получаем изображение
    };

    // Диспатчим создание нового товара

    createProduct(newProduct);
  };

  // Функция для удаления товара
  const handleDeleteProduct = (id) => {
    console.log(id);

    deleteProduct(id);
  };

  return (
    <div>
      {/* Таблица товаров */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Image Url</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-100 delay-120">
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.manufacturer}</TableCell>
                <TableCell>{row.imageUrl}</TableCell>
                <TableCell align="right">{row.price.toFixed(2)} ₽</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => handleDeleteProduct(row.id)}
                  >
                    {deleteProductLoading ? "Удаление" : "Удалить "}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Форма добавления нового продукта */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <TextField
          inputProps={{
            id: "title-input",
          }}
          label="Title"
          placeholder="Enter title..."
        />
        <TextField
          inputProps={{
            id: "description-input",
          }}
          label="Description"
          placeholder="Enter description..."
        />
        <TextField
          inputProps={{
            id: "price-input",
          }}
          label="Price"
          type="number"
          placeholder="Enter price..."
        />
        <TextField
          inputProps={{
            id: "quantity-input",
          }}
          label="Quantity"
          type="number"
          placeholder="Enter quantity..."
        />
        <TextField
          inputProps={{
            id: "category-input",
          }}
          label="Category"
          placeholder="Enter category..."
        />
        <TextField
          inputProps={{
            id: "manufacturer-input",
          }}
          label="Manufacturer"
          placeholder="Enter manufacturer..."
        />
        <TextField
          inputProps={{
            id: "image-url-input",
          }}
          label="Image URL"
          placeholder="Enter image URL..."
        />
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          {isLoading ? "Загрузка..." : "Добавить"}
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
