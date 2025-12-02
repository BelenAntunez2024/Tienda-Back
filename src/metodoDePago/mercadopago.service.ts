import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

@Injectable()
export class MercadoPagoService {

  private getClient() {

    const token = process.env.MP_ACCESS_TOKEN;

    if (!token) {
      throw new Error("MP_ACCESS_TOKEN no configurado en entorno");
    }

    return new MercadoPagoConfig({
      accessToken: token,
    });
  }


  async crearPreferencia(
    productos: any[],
    email: string,
    userId: number
  ) {

    try {

      const client = this.getClient();   // ✅ USAMOS EL TOKEN DESDE .ENV

      const preference = new Preference(client);

      const items = productos.map((p, index) => ({
        id: `item-${index}`,
        title: p.nombre,
        quantity: Number(p.cantidad),
        unit_price: Number(p.precio),
        currency_id: "ARS"
      }));

      const result = await preference.create({
        body: {

          items,

          payer: {
            email
          },

          back_urls: {
            success: process.env.MP_SUCCESS_URL,
            failure: process.env.MP_FAILURE_URL,
            pending: process.env.MP_PENDING_URL
          },

          notification_url: process.env.MP_NOTIFICATION_URL,

           auto_return: "approved", 

          metadata: {
            user_id: userId,
            email
          }
        }
      });

      return result;

    } catch (error) {

      console.error(error);

      throw new InternalServerErrorException(
        "Error al crear la preferencia de Mercado Pago"
      );
    }
  }


  async checkPayment(paymentId: string) {

    try {

      const client = this.getClient();   // ✅ MISMO CLIENTE

      const payment = new Payment(client);

      const data = await payment.get({ id: paymentId });

      return {
        status: data.status,
        status_detail: data.status_detail,
        monto: data.transaction_amount,
        userId: data.metadata?.user_id,
        emailComprador: data.metadata?.email,
        fecha: data.date_created
      };

    } catch (error) {

      console.error(error);

      throw new InternalServerErrorException(
        "Error al consultar el pago en Mercado Pago"
      );
    }
  }
}
