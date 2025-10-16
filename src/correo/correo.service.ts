import { Injectable } from '@nestjs/common';
import { CorreoDto } from './dto/correo.dto';

@Injectable()
export class CorreoService {
  create(correoDto: CorreoDto) {
    return 'This action adds a new correo';
  }

  findAll() {
    return `This action returns all correo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} correo`;
  }

  update(id: number, correoDto: CorreoDto) {
    return `This action updates a #${id} correo`;
  }

  remove(id: number) {
    return `This action removes a #${id} correo`;
  }
}
