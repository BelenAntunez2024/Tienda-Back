import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ClienteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsDate()
    @IsNotEmpty()
    F_nacimiento: Date;
    
    @IsNumber()
    @IsNotEmpty()
    usuarioId: number;
}
