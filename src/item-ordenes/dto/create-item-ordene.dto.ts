import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemOrdeneDto {
  @IsNumber()
  @IsNotEmpty()
  id_producto: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad_productos: number;

  @IsNumber()
  @IsNotEmpty()
  id_orden: number;
}
