import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordenes.entity';
import { Repository } from 'typeorm';
import { OrdenesDto } from './dto/ordenes.dto';
import { ProductoService } from 'src/producto/producto.service';
import { CreateItemOrdeneDto } from 'src/item-ordenes/dto/create-item-ordene.dto';
import { ProductoDto } from 'src/producto/dto/producto.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ItemOrdenesService } from 'src/item-ordenes/item-ordenes.service';
import { ItemOrden } from 'src/item-ordenes/entities/item-ordene.entity';

@Injectable()
export class OrdenesService {
  constructor(
        @InjectRepository(Ordenes)
        private readonly ordenesRepository: Repository<Ordenes>,
        @InjectRepository(ItemOrden)
        private readonly itemOrdenRepository: Repository<ItemOrden>,
        private readonly productoService: ProductoService,
        private readonly itemOrdenesService: ItemOrdenesService,
    ) {}
  create(ordenesDto: OrdenesDto) {
    return 'This action adds a new ordene';
  }

  findAll(): Promise<Ordenes[]> {
    return this.ordenesRepository.find({ relations: ['cliente'] });
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


  async procesarCompra(item: CreateItemOrdeneDto[], id_usuario: number): Promise<Ordenes> {
    
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
      // Verificar que el cliente exista y usar la entidad real
      const cliente = await this.ordenesRepository.manager.findOne(Cliente, { where: { Id_usuario: id_usuario } });
      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${id_usuario} no existe.`);
      }        
      // Crear Orden
      const nuevaOrden = this.ordenesRepository.create({
        cliente, // Asignar solo el ID del cliente            
        total: totalCalculado,
        fecha: new Date(),
      });
      const guardarOrden = await this.ordenesRepository.save(nuevaOrden);

      // Crear Items de Orden
      for (let i = 0; i < item.length; i++) {

        const itemDetalle = {
          id_orden: guardarOrden.id_orden, 
          id_producto: item[i].id_producto,
          cantidad_productos: item[i].cantidad_productos,
        };
    
        await this.itemOrdenesService.create(itemDetalle);
      }

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

  async vaciarCarrito(): Promise<void> {
    try {
      await this.ordenesRepository.manager.transaction(async manager => {
      await manager.query(`TRUNCATE TABLE "Ordenes" RESTART IDENTITY CASCADE;`);    
      });
    } catch (error) {
      console.error('Error durante la eliminación masiva de órdenes:', error);
      throw error;
    }
}
}
