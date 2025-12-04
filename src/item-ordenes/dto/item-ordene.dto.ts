import { Expose, Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ItemOrdeneDto {
  @IsNumber()
  @IsNotEmpty()
  id_producto: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad_productos: number;

  @IsNumber()
  @IsOptional()
  id_orden?: number;

  @Expose({ name: 'Id_usuario' })
  @IsOptional()
  @IsInt()
  usuarioId?: number;
  
}
