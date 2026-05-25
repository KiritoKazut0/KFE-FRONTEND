import { AuthResponseDto } from "../dtos/authResponse.dto";
import { UserRoleDto } from "../dtos/userRoleDto";
import { AuthResponse } from "../models/authResponse";
import { UserRole } from "../models/userRole.model";

export class AuthMapper {

    static toModel(dto: AuthResponseDto): AuthResponse {
        if (!dto.data) {
            throw new Error("Invalid auth response");
        }

        return {
            token: dto.token,
            user: {
                id: dto.data.id,
                name: dto.data.name,
                email: dto.data.email,
                role: this.toRoleModel(dto.data.role)
            }
        };
    }

   static toRoleModel(roleDto: UserRoleDto): UserRole {
    switch (roleDto) {
        case "ADMIN":
            return "Administrador";
        case "CASHIER":
            return  "Cajero";
        case "MANAGER":
            return "Gerente";
        default:
            throw new Error(`Unknown role: ${roleDto}`);
    }
}
}