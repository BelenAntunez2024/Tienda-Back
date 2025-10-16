import { Injectable } from '@nestjs/common';
import { ProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductoService {
  create(productoDto: ProductoDto) {
    return 'This action adds a new producto';
  }

  findAll() {
    return `This action returns all producto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, productoDto: ProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
