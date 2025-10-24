import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class UsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombreCompleto: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    contraseña: string;

    @IsDate()
    @IsNotEmpty()
    fechaNacimiento: Date;
}
