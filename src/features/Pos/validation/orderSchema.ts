import * as yup from "yup";
import { PaymentMethodDto } from "../interfaces/dto/oder.dto"; 

export const createOrderSchema = yup.object({
  methodPayment: yup
    .mixed<PaymentMethodDto>()
    .oneOf(["CASH", "CARD", "TRANSFER"], "Método de pago inválido")
    .required("El método de pago es obligatorio"),

  items: yup
    .array()
    .of(
      yup.object({
        productId: yup
          .string()
          .required("El producto es obligatorio"),

        quantity: yup
          .number()
          .typeError("La cantidad debe ser un número")
          .required("La cantidad es obligatoria")
          .min(1, "La cantidad debe ser mayor o igual a 1"),
      })
    )
    .min(1, "Debe agregar al menos un producto")
    .required("Los items son obligatorios"),
});

export type createOrderFormData = yup.InferType<typeof createOrderSchema>;