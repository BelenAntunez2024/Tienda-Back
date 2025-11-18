import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CorreoDto } from './dto/correo.dto';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  async sendContactNotification(correoDto: CorreoDto): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'TiendaWisteriaOficial@gmail.com',
      subject: `Nuevo mensaje de contacto: ${correoDto.clasificacion_mjs}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nuevo mensaje de contacto recibido</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>De:</strong> ${correoDto.email}</p>
            <p><strong>Tipo de consulta:</strong> ${correoDto.clasificacion_mjs}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff;">
              ${correoDto.mensaje.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Este mensaje fue enviado desde el formulario de contacto de tu tienda.
          </p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email de notificación enviado exitosamente');
    } catch (error) {
      console.error('Error enviando email de notificación:', error);
      throw error;
    }
  }
}
