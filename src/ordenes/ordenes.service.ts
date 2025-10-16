import { Injectable } from '@nestjs/common';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';

@Injectable()
export class OrdenesService {
  create(createOrdeneDto: CreateOrdeneDto) {
    return 'This action adds a new ordene';
  }

  findAll() {
    return `This action returns all ordenes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordene`;
  }

  update(id: number, updateOrdeneDto: UpdateOrdeneDto) {
    return `This action updates a #${id} ordene`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordene`;
  }
}
