import * as Yup from "yup"

export const loginSchema = Yup.object({
    email: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),

    password: Yup.string()
        .min(8, "Mínimo 8 caracteres")
        .required("La contraseña es obligatoria")
});

export type LoginFormData = Yup.InferType<typeof loginSchema>;