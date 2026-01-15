"use client";

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useGetProductByIdQuery } from "@/services/productsApi";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category?: string;
    manufacturer?: string;
  };
}

const ProductCard = ({ id }) => {
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  if (!product) return;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="280"
          image={product?.imageUrl}
          alt={`Фото ${product.title}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product?.description}
          </Typography>
          <Typography variant="subtitle1" color="primary.main">
            Цена: {product.price.toLocaleString()} руб.
          </Typography>
          {product.category && (
            <Typography variant="caption" color="text.secondary">
              Категория: {product.category}
            </Typography>
          )}
          {product.manufacturer && (
            <Typography variant="caption" color="text.secondary">
              Производитель: {product.manufacturer}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
