import { IsDate, IsNotEmpty, IsNumber} from "class-validator";

export class OrdenesDto {
    @IsNumber()
    @IsNotEmpty()
    id_orden: number;
    
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @IsDate()
    @IsNotEmpty()
    fecha: Date;
}
