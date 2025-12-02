import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreatePreferenceDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  precio: number;
    
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;
    
  @IsNotEmpty()
  @IsString()
  Id_producto: string;
}