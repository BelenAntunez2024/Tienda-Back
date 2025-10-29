import { Injectable } from '@nestjs/common';
import { CreateItemOrdeneDto } from './dto/create-item-ordene.dto';
import { UpdateItemOrdeneDto } from './dto/update-item-ordene.dto';
import { ItemOrden } from './entities/item-ordene.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemOrdenesService {
  constructor(
    @InjectRepository(ItemOrden) 
    private readonly itemOrdenRepository: Repository<ItemOrden>,
  ) {}

  async create(createItemOrdeneDto: CreateItemOrdeneDto) {
    const nuevoItem = this.itemOrdenRepository.create(createItemOrdeneDto);
    return this.itemOrdenRepository.save(nuevoItem);
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

  //eliminar todos los productos de una orden
  eliminarOrden(idOrden: number) {
    return this.itemOrdenRepository.delete({ id_item_orden: idOrden });
  }

  async vaciarCarrito() {
    return this.itemOrdenRepository.clear(); // Elimina todos los registros de la tabla
  }
}
