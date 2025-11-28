import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsOptional()
  @IsString() //agregado como opcional
  imagen?: string;

  @IsOptional()
  @IsString() //agregado como opcional
  descripcion?: string;

}
