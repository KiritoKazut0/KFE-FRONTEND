import * as Yup from "yup";
import { ProductTypeDto } from "../interfaces/dtos/product.dto";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp"
];

export const productSchema = Yup.object({

  categoryId: Yup.string()
    .required("Debe seleccionar una categoría para el producto")
    .uuid("La categoría seleccionada no es válida"),

  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres")
    .max(100, "No puede exceder los 100 caracteres"),

  typeProduct: Yup.mixed<ProductTypeDto>()
    .oneOf(["STANDARD", "PREPARED", "KIT"], "Tipo de producto no válido")
    .required("El tipo de producto es obligatorio"),

  price: Yup.number()
    .typeError("El precio debe ser un número válido")
    .required("El precio es obligatorio")
    .positive("El precio debe ser mayor a 0"),

  stock: Yup.number()
    .optional()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .when("typeProduct", ([type], schema) => {
      return type === "STANDARD"
        ? schema
            .required("Stock obligatorio para productos estándar")
            .min(0, "El stock no puede ser negativo")
        : schema.notRequired().nullable();
    }),

  file: Yup.mixed<File>()
    .required("La imagen es obligatoria")
    .test(
      "fileSize",
      "La imagen es demasiado pesada (Máximo 2MB)",
      (value) => {
        if (!value) return true; 
        return value.size <= MAX_FILE_SIZE;
      }
    )
    .test(
      "fileFormat",
      "Formato no soportado (Solo JPG, JPEG, PNG o WEBP)",
      (value) => {
        if (!value) return true;
        return SUPPORTED_FORMATS.includes(value.type);
      }
    ),
});

export type ProductFormData = Yup.InferType<typeof productSchema>;