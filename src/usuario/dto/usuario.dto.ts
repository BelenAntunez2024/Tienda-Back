import { IsString, MaxLength, MinLength, IsNotEmpty, IsDate, IsOptional, IsEmail, } from "class-validator";
import { Transform } from "class-transformer";

export class UsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombreCompleto: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    contraseña: string;

    @Transform(({value}) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    fechaNacimiento: Date;

    @IsOptional()
    foto?: string;


}
