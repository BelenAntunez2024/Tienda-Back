import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig } from 'mercadopago';

@Injectable()
export class MercadoPagoProvider {
  public readonly client: MercadoPagoConfig;

  constructor() {
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) {
      throw new Error("❌ Falta MP_ACCESS_TOKEN en variables de entorno");
    }

    this.client = new MercadoPagoConfig({
      accessToken: token,
      options: { timeout: 5000 },
    });
  }
}
