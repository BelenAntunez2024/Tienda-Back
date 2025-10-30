import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CorreoDto {

    @IsString()
    @IsNotEmpty()
    clasificacion_mjs: string;

    @IsString()
    @IsNotEmpty()
    mensaje: string;
    
    @IsNotEmpty()
    @IsEmail()
    email:string;
}
