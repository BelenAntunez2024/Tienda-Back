import { Injectable, BadRequestException } from '@nestjs/common';
import { MercadoPagoProvider } from './mercadopago.provider';
import { Preference } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private preference: Preference;

  constructor(private readonly mpProvider: MercadoPagoProvider) {
    this.preference = new Preference(this.mpProvider.client);
  }

  /*async crearPreferencia(productos: any[], email: string) {
    if (!Array.isArray(productos) || productos.length === 0) {
      throw new BadRequestException("La lista de productos está vacía");
    }

    const items = productos.map((p, index) => ({
      id: `item-${index}`,
      title: p.nombre,
      quantity: Number(p.cantidad),
      unit_price: Number(p.precio),
      currency_id: "ARS"
    }));

    const result = await this.preference.create({
      body: {
        items,
        payer: { email },
        back_urls: {
         success: "https://multiply-thankful-tate.ngrok-free.dev/mercado-pago/pago-exitoso",
         failure: "https://multiply-thankful-tate.ngrok-free.dev/mercado-pago/pago-fallido",
         pending: "https://multiply-thankful-tate.ngrok-free.dev/mercado-pago/pago-pendiente"
          },
        auto_return: "approved",
      }
    });

    return { preferenceId: result.id };*/
  async crearPreferencia(productos: any[], email: string) {
  try {
    const items = productos.map((p, index) => ({
      id: `item-${index}`,
      title: p.nombre,
      quantity: Number(p.cantidad),
      unit_price: Number(p.precio),
      currency_id: "ARS"
    }));

    const result = await this.preference.create({
      body: {
        items,
        payer: { email },
        back_urls: {
          success: "https://multiply-thankful-tate.ngrok-free.dev/mercado-pago/pago-exitoso",
          failure: "https://multiply-thankful-tate.ngrok-free.dev/mercado-pago/pago-fallido",
          pending: "https://multiply-thankful-tate.ngrok-free.dev/mercado-pago/pago-pendiente",
        },
        auto_return: "approved"
      }
    });

    return { preferenceId: result.id };

  } catch (err: any) {
    console.error("❌ ERROR MP:", err);
    throw err;
  }
}
}
