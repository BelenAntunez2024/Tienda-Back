import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordenes.entity';
import { Repository } from 'typeorm';
import { OrdenesDto } from './dto/ordenes.dto';
import { ProductoService } from 'src/producto/producto.service';
import { CreateItemOrdeneDto } from 'src/item-ordenes/dto/create-item-ordene.dto';
import { ProductoDto } from 'src/producto/dto/producto.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class OrdenesService {
  constructor(
        @InjectRepository(Ordenes)
        private readonly ordenesRepository: Repository<Ordenes>,
        private readonly productoService: ProductoService,
    ) {}
    
  create(ordenesDto: OrdenesDto) {
    return 'This action adds a new ordene';
  }

  findAll(): Promise<Ordenes[]> {
    return this.ordenesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} ordene`;
  }

  async calcularTotal(item: CreateItemOrdeneDto[]): Promise<number> {
    let total = 0;
    for (let i= 0; i < item.length; i++) {
      const producto = await this.productoService.findOne(item[i].id_producto);
      // Verificar si el producto existe
      if (!producto) {
          throw new NotFoundException(`El producto con ID ${item[i].id_producto} no fue encontrado.`);
      }
      if (producto.stock < item[i].cantidad_productos) {
          throw new BadRequestException(`Stock insuficiente para el producto ${producto.nombre}.`);
      }
      // La suma solo se hace si el producto existe y hay stock suficiente.
      total += producto.precio * item[i].cantidad_productos;
    }
    return total;
  }


  async procesarCompra(item: CreateItemOrdeneDto[], userId: number): Promise<Ordenes> {
    
    try {
      const totalCalculado = await this.calcularTotal(item);
    
      // Simulamos que el pago siempre es exitoso
      const pagoExitoso = true;
      if (!pagoExitoso) {
        // Si el pago falla, lanzamos una excepción.
        throw new BadRequestException('El pago no pudo ser procesado.');
      }
      // Actualizar Stock
      for (let i = 0; i < item.length; i++) {
        await this.productoService.actualizarStock(item[i].id_producto, item[i].cantidad_productos);
      }        
      // Crear Orden
      const nuevaOrden = this.ordenesRepository.create({
        cliente: { id_usuario: userId } as Cliente, // Asignar solo el ID del cliente            
        total: totalCalculado,
        fecha: new Date(),
      });
      const guardarOrden = await this.ordenesRepository.save(nuevaOrden);

      return guardarOrden;
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      throw error;
    }
  }

  update(id: number, updateOrdenesDto: OrdenesDto) {
    return `This action updates a #${id} ordene`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordene`;
  }
}
