"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "@/services/productsApi";
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentProductForEdit, setCurrentProductForEdit] = useState(null);

  const { data: products, isError } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();

  const handleAddProduct = () => {
    setOpenAddModal(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProductForEdit(product);
    setOpenEditModal(true);
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="w-full p-4 gap-2 flex flex-col">
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        className="w-fit"
      >
        Добавить продукт
      </Button>
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
              <TableCell></TableCell>
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
                    color="primary"
                    variant="outlined"
                    href={`products/${row.id}`}
                  >
                    Детали
                  </Button>{" "}
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => handleEditProduct(row)}
                  >
                    Редактировать
                  </Button>{" "}
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => handleDeleteProduct(row.id)}
                  >
                    {deleteProductLoading ? "Удаление" : "Удалить"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductForm
        open={openAddModal}
        mode="add"
        onClose={() => setOpenAddModal(false)}
      />
      {currentProductForEdit && (
        <ProductForm
          key={currentProductForEdit.id}
          open={openEditModal}
          product={currentProductForEdit}
          mode="edit"
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
