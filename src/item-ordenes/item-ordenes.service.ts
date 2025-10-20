import { Injectable } from '@nestjs/common';
import { CreateItemOrdeneDto } from './dto/create-item-ordene.dto';
import { UpdateItemOrdeneDto } from './dto/update-item-ordene.dto';

@Injectable()
export class ItemOrdenesService {
  create(createItemOrdeneDto: CreateItemOrdeneDto) {
    return 'This action adds a new itemOrdene';
  }

  findAll() {
    return `This action returns all itemOrdenes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemOrdene`;
  }

  update(id: number, updateItemOrdeneDto: UpdateItemOrdeneDto) {
    return `This action updates a #${id} itemOrdene`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemOrdene`;
  }
}
