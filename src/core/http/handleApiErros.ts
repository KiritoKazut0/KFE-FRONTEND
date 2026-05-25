import { ApiError } from "./apiErrors";

export const handleApiError = (error: unknown, message: string) => {

    if (error instanceof ApiError) {
        switch (error.status) {
            case 401:
                return "Credenciales inválidas";
            case 409:
                return message;
            case 500:
                return "Error del servidor";
            case 400:
                return error.message;
            default:
                return "Error inesperado";
        }
    }

    return "Error desconocido";
};