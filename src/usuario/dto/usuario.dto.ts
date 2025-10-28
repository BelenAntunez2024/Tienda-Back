import { IsString, MaxLength, MinLength, IsNotEmpty, IsDate, } from "class-validator";
import { Transform } from "class-transformer";

export class UsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombreCompleto: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    contraseña: string;

    @IsDate()
    @IsNotEmpty()
    fechaNacimiento: Date;

    foto?: string;


}
