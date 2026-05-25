import { UserRoleDto } from "./userRoleDto";


export interface AuthResponseDto {
    token: string;
    data: UserDto
}


interface UserDto {
    id: string;
    name: string;
    email: string;
    role: UserRoleDto
}