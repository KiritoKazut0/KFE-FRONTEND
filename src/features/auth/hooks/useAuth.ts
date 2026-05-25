import {  useMutation } from "@tanstack/react-query";
import { AuthAccessDto } from "../interfaces/dtos/authAccess.dto";
import { AuthAccesService, AuthRegisterService} from "../services/authService";
import { AuthRegisterDto } from "../interfaces/dtos/authRegister.dto";

export const useAuthAccess = () => {
    return useMutation({
        mutationFn: (userData: AuthAccessDto) => AuthAccesService(userData)
    });
}

export const useAuthRegister = () => {
    return useMutation({
        mutationFn: (userData: AuthRegisterDto) => AuthRegisterService(userData)
    })
}