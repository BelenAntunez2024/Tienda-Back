import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const ROLES_KEY = 'roles';
//SetMetadata es un decorador que se utilizza para asignar metadatos personalizados a los controllers
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
//recibe un key (nombre clave) y el value (el valor que deseo asignar a la clave)