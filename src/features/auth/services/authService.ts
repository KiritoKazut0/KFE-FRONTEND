import api from "@/src/core/http/api";
import { AuthAccessDto } from "../interfaces/dtos/authAccess.dto";
import { AuthMapper } from "../interfaces/mappers/authMapper";
import { AuthRegisterDto } from "../interfaces/dtos/authRegister.dto";
import { handleApiError } from "@/src/core/http/handleApiErros"; 
import { AuthResponse } from "../interfaces/models/authResponse";

export const AuthAccesService = async (data: AuthAccessDto): Promise<AuthResponse> => {
    try {
        const result = await api.post('/auth/access', data);
        const dto = result.data
        return AuthMapper.toModel(dto)
    } catch (error) {
         throw new Error(handleApiError(error, "Error al iniciar sesión"));
    }
}


export const AuthRegisterService = async (data: AuthRegisterDto): Promise<AuthResponse> => {
    try {
        const result = await api.post('auth/register', data);
        const dto = result.data;
        return AuthMapper.toModel(dto);
    } catch (error) {
        throw new Error(handleApiError(error, "Error al registrar usuario"));
    }
}