import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ClasificacionMensaje } from "../clasificacion-mensaje.enum";

export class CorreoDto {

    @IsNotEmpty()
    @IsEnum(ClasificacionMensaje)
    //'consulta', 'reclamo', 'otra'], { message: 'La clasificacion debe ser consulta, sugerencia, reclamo u otra' })
    clasificacion_mjs: string;

    @IsString()
    @IsNotEmpty()
    mensaje: string;
    
    @IsNotEmpty()
    @IsEmail()
    email:string;
}
