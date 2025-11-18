import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ClasificacionMensaje } from "../clasificacion-mensaje.enum";

export class CorreoDto {

    @IsNotEmpty()
    @IsEnum(ClasificacionMensaje)
    clasificacion_mjs: ClasificacionMensaje;

    @IsString()
    @IsNotEmpty()
    mensaje: string;
    
    @IsNotEmpty()
    @IsEmail()
    email:string;
}
