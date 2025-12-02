import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordenes.entity';
import { IsNull, Repository } from 'typeorm';
import { OrdenesDto } from './dto/ordenes.dto';
import { ProductoService } from 'src/producto/producto.service';
import { CreateItemOrdeneDto } from 'src/item-ordenes/dto/create-item-ordene.dto';
import { ProductoDto } from 'src/producto/dto/producto.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ItemOrdenesService } from 'src/item-ordenes/item-ordenes.service';
import { ItemOrden } from 'src/item-ordenes/entities/item-ordene.entity';
import { Producto } from 'src/producto/entities/producto.entity';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Ordenes)
    private readonly ordenesRepository: Repository<Ordenes>,
    @InjectRepository(ItemOrden)
    private readonly itemOrdenRepository: Repository<ItemOrden>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly productoService: ProductoService,
    private readonly itemOrdenesService: ItemOrdenesService,
  ) { }

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
    for (let i = 0; i < item.length; i++) {
      console.log('Item en calcularTotal:', item[i]);
      console.log('id_producto:', item[i].id_producto);
      
      if (!item[i].id_producto) {
        throw new BadRequestException(`El item en posición ${i} no tiene id_producto válido`);
      }
      
      // Buscar directamente en el repositorio
      const producto = await this.productoRepository.findOne({ 
        where: { id_producto: item[i].id_producto } 
      });
      
      console.log('Producto encontrado:', producto);
      
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


  async procesarCompra(item: CreateItemOrdeneDto[], Id_usuario: number): Promise<Ordenes> {

    try {
      const totalCalculado = await this.calcularTotal(item);

      // Actualizar Stock
      for (let i = 0; i < item.length; i++) {
        await this.productoService.actualizarStock(item[i].id_producto, item[i].cantidad_productos);
      }
      // Verificar que el cliente exista y usar la entidad real
      const clienteRepository = this.ordenesRepository.manager.getRepository(Cliente);
      const cliente = await clienteRepository.findOne({ where: { Id_usuario: Id_usuario } });
      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${Id_usuario} no existe.`);
      }

      // Crear Orden
      const nuevaOrden = this.ordenesRepository.create({
        cliente: cliente,
        total: totalCalculado,
        fecha: new Date(),
      });

      const guardarOrden = await this.ordenesRepository.save(nuevaOrden);

      // Crear Items de Orden
      for (let i = 0; i < item.length; i++) {

        const itemDetalle = {
          id_orden: guardarOrden.ID_orden,
          id_producto: item[i].id_producto,
          cantidad_productos: item[i].cantidad_productos,
          usuarioId: Id_usuario
        };

        await this.itemOrdenesService.create(itemDetalle);
      }

      return guardarOrden;
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      throw error;
    }
  }

  async procesarCompraDesdeMP(userId: number, paymentId: string) {

  // 1️⃣ Buscar carrito
  const carrito = await this.itemOrdenRepository.find({
    where: {
      Id_usuario: userId,
      orden: require('typeorm').IsNull()
    }
  });

  if (!carrito.length) {
    throw new BadRequestException("El carrito está vacío");
  }

  // 2️⃣ Convertir carrito al formato que usa procesarCompra()
  const items: CreateItemOrdeneDto[] = carrito.map(item => ({
    id_producto: item.id_producto,
    cantidad_productos: item.cantidad_productos,
    usuarioId: userId,
    id_orden: undefined
  }));

  // 3️⃣ Ejecutar la lógica existente
  const orden = await this.procesarCompra(items, userId);

  // 4️⃣ Setear el id de pago y método de pago
  orden.metodo_pago = 'mercado_pago';
  await this.ordenesRepository.save(orden);

  // ✅ LIMPIAMOS CARRITO SOLO AHORA
  await this.vaciarCarrito(userId);

  console.log("Orden creada desde MP:", orden.ID_orden);

  return orden;
}
 async findByUser(id: number) {
    return await this.ordenesRepository.find({
      where: { cliente: { Id_usuario: id } },
      relations: ['cliente', 'itemOrdenes', 'itemOrdenes.producto'],
    });
  }

  update(id: number, updateOrdenesDto: OrdenesDto) {
    return `This action updates a #${id} ordene`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordene`;
  }

 /* async vaciarCarrito(): Promise<void> {
    try {
      await this.ordenesRepository.manager.transaction(async manager => {
        await manager.query(`TRUNCATE TABLE "Ordenes" RESTART IDENTITY CASCADE;`);
      });
    } catch (error) {
      console.error('Error durante la eliminación masiva de órdenes:', error);
      throw error;
    }
  }*/
  async vaciarCarrito(userId: number) {
  await this.itemOrdenRepository.delete({
    Id_usuario: userId,
    id_orden: IsNull()
  });
}

}