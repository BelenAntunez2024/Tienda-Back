import { Injectable, Param } from '@nestjs/common';
import { CorreoDto } from './dto/correo.dto';
import { Correo } from './entities/correo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClasificacionMensaje } from './clasificacion-mensaje.enum';

@Injectable()
export class CorreoService {

  constructor(
    @InjectRepository(Correo)
      private readonly correoRepository: Repository<Correo>,
  ){}

  async create(correoDto: CorreoDto): Promise<Correo> {
    const newCorreo = this.correoRepository.create(correoDto);
    return this.correoRepository.save(newCorreo);
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
