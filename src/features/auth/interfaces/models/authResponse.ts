import { User } from "./user.model";
import { UserRole } from "./userRole.model";

export interface AuthResponse {
    token: string;
    user: User
}