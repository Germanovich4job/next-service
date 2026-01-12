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
  Box,
} from "@mui/material";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { useDispatch, useSelector } from "react-redux";

import {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "@/services/productsApi";
import React from "react";

const ProductList = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();
  const { data: products, isError } = useGetAllProductsQuery(); // получаем список товаров

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append(
      "title",
      document.querySelector("#title-input")!.value.trim()
    );
    formData.append(
      "description",
      document.querySelector("#description-input")!.value.trim()
    );
    formData.append(
      "price",
      document.querySelector("#price-input")!.value.trim()
    );
    formData.append(
      "quantity",
      document.querySelector("#quantity-input")!.value.trim()
    );
    formData.append(
      "category",
      document.querySelector("#category-input")!.value.trim()
    );
    formData.append(
      "manufacturer",
      document.querySelector("#manufacturer-input")!.value.trim()
    );
    if (selectedFile) {
      formData.append("image", selectedFile); // Добавляем выбранный файл
    }

    // Диспатчим создание нового товара

    createProduct(formData);
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
        <Box>
          <TextField
            inputProps={{ id: "title-input" }}
            label="Title"
            placeholder="Enter title..."
          />
          ...
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setSelectedFile(e.target.files && e.target.files[0])
            }
            ref={fileInputRef}
            hidden
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddAPhotoIcon />}
            onClick={() => fileInputRef.current.click()}
          >
            Загрузить изображение
          </Button>
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          {isLoading ? "Загрузка..." : "Добавить"}
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
