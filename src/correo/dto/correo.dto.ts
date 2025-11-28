import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CorreoDto {

    @IsNotEmpty()
    @IsEnum(['consulta', 'reclamo', 'otro'], { message: 'La clasificacion debe ser consulta, sugerencia, reclamo u otro' })
    clasificacion_mjs: string;

    @IsString()
    @IsNotEmpty()
    mensaje: string;
    
    @IsNotEmpty()
    @IsEmail()
    email:string;
}
