"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDispatch } from "react-redux";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/services/productsApi";

// Валидная схема Zod для нашего продукта
const schema = z.object({
  title: z.string().min(1, { message: "Название обязательно" }),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  category: z.string().optional(),
  manufacturer: z.string().optional(),
});

type ProductFormProps = {
  open: boolean;
  product?: any; // Если передается, значит идет редактирование
  onClose: () => void;
  mode: "add" | "edit"; // Режимы формы: добавить или обновить
};

const ProductForm = ({ open, product, onClose, mode }: ProductFormProps) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Используем useForm вместе с Zod для контроля формы
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: product || {},
  });

  console.log(product, "product");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const currentValues = watch(); // Наблюдение за всеми полями одновременно

  console.log(currentValues); // Здесь видим текущие значения полей

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const submitHandler = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price); // Преобразование числа в строку
    formData.append("quantity", data.quantity); // Аналогично
    formData.append("category", data.category || "");
    formData.append("manufacturer", data.manufacturer || "");

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (mode === "add") {
      await createProduct(formData)
        .unwrap()
        .then(() => {
          reset(); // Сбрасываем форму после успешного добавления
          onClose();
        })
        .catch((err) => console.error("Ошибка при создании продукта:", err));
    } else if (mode === "edit") {
      await updateProduct({ id: product.id, changes: formData })
        .unwrap()
        .then(() => {
          onClose();
        })
        .catch((err) => console.error("Ошибка при обновлении продукта:", err));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {mode === "add" ? "Добавление продукта" : "Редактирование продукта"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextField
            label="Название"
            helperText={errors.title?.message}
            error={!!errors.title}
            fullWidth
            margin="dense"
            value={currentValues.title || ""}
            onChange={(event) => setValue("title", event.target.value)}
          />
          <TextField
            label="Описание"
            helperText={errors.description?.message}
            error={!!errors.description}
            fullWidth
            margin="dense"
            value={currentValues.description || ""}
            onChange={(event) => setValue("description", event.target.value)}
          />
          <TextField
            label="Цена"
            helperText={errors.price?.message}
            error={!!errors.price}
            fullWidth
            margin="dense"
            type="number"
            value={Number(currentValues.price)}
            onChange={(event) => setValue("price", Number(event.target.value))}
          />
          <TextField
            label="Количество"
            helperText={errors.quantity?.message}
            error={!!errors.quantity}
            fullWidth
            margin="dense"
            type="number"
            value={Number(currentValues.quantity)}
            onChange={(event) =>
              setValue("quantity", Number(event.target.value))
            }
          />
          <TextField
            label="Категория"
            helperText={errors.category?.message}
            error={!!errors.category}
            fullWidth
            margin="dense"
            value={currentValues.category || ""}
            onChange={(event) => setValue("category", event.target.value)}
          />
          <TextField
            label="Производитель"
            helperText={errors.manufacturer?.message}
            error={!!errors.manufacturer}
            fullWidth
            margin="dense"
            value={currentValues.manufacturer || ""}
            onChange={(event) => setValue("manufacturer", event.target.value)}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddAPhotoIcon />}
              onClick={() => fileInputRef.current?.click()}
            >
              Выберите изображение
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedFile(e.target.files && e.target.files[0])
              }
              ref={fileInputRef}
              hidden
            />
          </Box>
          <DialogActions>
            <Button onClick={onClose}>Отменить</Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating ? (
                <CircularProgress size={24} />
              ) : mode === "add" ? (
                "Добавить"
              ) : (
                "Обновить"
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
