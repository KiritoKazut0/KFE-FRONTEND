import { UserRole } from "./userRole.model";


export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}