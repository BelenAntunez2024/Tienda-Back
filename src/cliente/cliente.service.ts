import { Injectable } from '@nestjs/common';
import { ClienteDto } from './dto/cliente.dto';

@Injectable()
export class ClienteService {
  create(createClienteDto: ClienteDto) {
    return 'This action adds a new cliente';
  }

  findAll() {
    return `This action returns all cliente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cliente`;
  }

  update(id: number, updateClienteDto: ClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
