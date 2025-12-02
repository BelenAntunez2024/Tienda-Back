import { Injectable, Param } from '@nestjs/common';
import { CorreoDto } from './dto/correo.dto';
import { Correo } from './entities/correo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClasificacionMensaje } from './clasificacion-mensaje.enum';
import { EmailService } from './emailCorreoService';

@Injectable()
export class CorreoService {

  constructor(
    @InjectRepository(Correo)
    private readonly correoRepository: Repository<Correo>,
    private readonly emailService: EmailService,
  ) { }

  async create(correoDto: CorreoDto): Promise<Correo> {
    const newCorreo = this.correoRepository.create(correoDto);
    const savedCorreo = await this.correoRepository.save(newCorreo);

    // Enviar notificación por email de forma asíncrona
    this.emailService.sendContactNotification(correoDto)
      .catch(error => console.error('Error en envío de email:', error));

    return savedCorreo;
  }

  findAll(): Promise<Correo[]> {
    return this.correoRepository.find();
  }

  //Filtra los correos por su clasificación (consulta, reclamo, otra)
  async filtrarTipoDeMensaje(clasificacion: ClasificacionMensaje): Promise<Correo[]> {

    return this.correoRepository.find({
      where: {
        clasificacion_mjs: clasificacion,
      },
    });
  }


  update(id: number, correoDto: CorreoDto) {
    return `This action updates a #${id} correo`;
  }


  remove(id: number) {
    return `This action removes a #${id} correo`;
  }
}
