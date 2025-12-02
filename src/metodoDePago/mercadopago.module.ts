import { Module } from "@nestjs/common";
import { MercadoPagoController } from "./mercadopago.controller";
import { MercadoPagoService } from "./mercadopago.service";
import { OrdenesModule } from "src/ordenes/ordenes.module";

@Module({
  imports: [OrdenesModule],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class MercadoPagoModule {}
