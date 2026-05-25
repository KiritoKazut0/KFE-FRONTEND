import * as Yup from "yup";
import { UserRoleDto } from "../interfaces/dtos/userRoleDto";

const roles: UserRoleDto[] = ["MANAGER", "CASHIER", "ADMIN"];

export const RegisterSchema = Yup.object({
    name: Yup.string()
        .min(3, "Mínimo 3 caracteres")
        .required("El nombre es obligatorio"),

    email: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),

    password: Yup.string()
        .min(8, "Mínimo 8 caracteres")
        .required("La contraseña es obligatoria"),

    role: Yup.mixed<UserRoleDto>()
        .oneOf(roles, "Rol inválido")
        .required("El rol es obligatorio"),
});

export type RegisterFormData = Yup.InferType<typeof RegisterSchema>;