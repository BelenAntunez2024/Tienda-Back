import { Controller, Body, Post, Get, Query, BadRequestException, Res } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { Response } from 'express';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mpService: MercadoPagoService) {}

  // 👉 Crear preferencia
  @Post('crear-preferencia')
  async crearPreferencia(@Body() data: { productos: any[]; email: string }) {
    if (!data.email) {
      throw new BadRequestException("Email requerido");
    }

    const pref = await this.mpService.crearPreferencia(data.productos, data.email);
    return { preferenceId: pref.preferenceId };
  }

  // 👉 Pago exitoso
  @Get('pago-exitoso')
  handleSuccess(
    @Query('payment_id') paymentId: string,
    @Res() res: Response
  ) {
    console.log("Pago exitoso:", paymentId);

    // Redirige al Front (Home o página de confirmación)
    return res.redirect(`http://localhost:5173/?pago=exitoso&payment_id=${paymentId}`);
  }

  // 👉 Pago fallido
  @Get('pago-fallido')
  handleFailure(
    @Query('payment_id') paymentId: string,
    @Res() res: Response
  ) {
    console.log("Pago fallido:", paymentId);

    return res.redirect(`http://localhost:5173/?pago=fallido`);
  }

  // 👉 Pago pendiente
  @Get('pago-pendiente')
  handlePending(
    @Query('payment_id') paymentId: string,
    @Res() res: Response
  ) {
    console.log("Pago pendiente:", paymentId);

    return res.redirect(`http://localhost:5173/?pago=pendiente`);
  }
}
