import { IsDate, IsNotEmpty, IsNumber, IsOptional} from "class-validator";

export class OrdenesDto {
    @IsNumber()
    @IsNotEmpty()
    ID_orden: number;
    
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsDate()
    @IsNotEmpty()
    fecha: Date;

    @IsOptional()
    metodo_pago: string;
}
