import * as Yup from "yup";

export const categorySchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),

  description: Yup.string()
    .required("La descripción es obligatoria")
    .min(5, "Mínimo 5 caracteres")
    .max(200, "Máximo 200 caracteres"),
});

export type CategoryFormData = Yup.InferType<typeof categorySchema>;