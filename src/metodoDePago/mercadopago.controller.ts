import {  Controller,Post,Body,BadRequestException,Res,HttpStatus} from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { OrdenesService } from 'src/ordenes/ordenes.service';

@Controller('mercado-pago')
export class MercadoPagoController {

constructor(
  private readonly mercadoPagoService: MercadoPagoService,
  private readonly ordenesService: OrdenesService   // 👈 inyectamos órdenes
) {}

  // 🔹 CREA LA PREFERENCIA PARA PAGAR EL CARRITO
  @Post('crear-preferencia')
  async crearPreferencia(
      @Body() body: { productos: any[]; email: string; userId: number }
  ) {

    if (!body.productos || body.productos.length === 0) {
      throw new BadRequestException("No hay productos para pagar");
    }

    if (!body.email) {
      throw new BadRequestException("Email requerido");
    }

    const tokenMP = process.env.MP_ACCESS_TOKEN || '';

    if (!tokenMP) {
      throw new BadRequestException("No se configuró el token de Mercado Pago");
    }

    const preference = await this.mercadoPagoService.crearPreferencia(
      body.productos,
      body.email,
      body.userId
    );

    return {
      init_point: (preference as any).init_point || (preference as any).sandbox_init_point || '',
      preferenceId: (preference as any).preferenceId || (preference as any).id
    };
  }

  @Post('webhook')
async webhook(@Body() body: any, @Res() res) {

  const topic = body.type || body.topic;

  if (topic === 'payment') {

    const paymentId = body.data?.id || body.id;

    if (!paymentId) {
      return res.status(HttpStatus.OK).send('Sin payment id');
    }

    try {

      const infoPago = await this.mercadoPagoService.checkPayment(paymentId);

      if (infoPago.status === 'approved') {

        console.log("🔥 WEBHOOK OK");
        console.log("METADATA:", infoPago);

        const userId = Number(infoPago.userId);

        console.log("USER ID:", userId);
        console.log("PAYMENT ID:", paymentId);

        await this.ordenesService.procesarCompraDesdeMP(
          userId,
          paymentId
        );

        console.log("✅ ORDEN GENERADA OK");
      }

    } catch (error) {
      console.error("❌ ERROR EN WEBHOOK:", error);
      throw error; // 👈 IMPORTANTE: no ocultar errores
    }
  }

  return res.status(HttpStatus.OK).send('OK');
}


}
