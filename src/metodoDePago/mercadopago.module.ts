import { Module } from "@nestjs/common";
import { MercadoPagoController } from "./mercadopago.controller";
import { MercadoPagoService } from "./mercadopago.service";
import { MercadoPagoProvider } from "./mercadopago.provider";

@Module({
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService, MercadoPagoProvider]
})
export class MercadoPagoModule {}
