import { UserRoleDto } from "./userRoleDto";

export interface AuthRegisterDto {
    name: string;
    email: string;
    password: string
    role: UserRoleDto
}



