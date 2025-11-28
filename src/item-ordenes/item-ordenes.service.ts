import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemOrdeneDto } from './dto/create-item-ordene.dto';
import { UpdateItemOrdeneDto } from './dto/update-item-ordene.dto';
import { ItemOrden } from './entities/item-ordene.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { ProductoService } from 'src/producto/producto.service';
import { async } from 'rxjs';

@Injectable()
export class ItemOrdenesService {
  constructor(
    @InjectRepository(ItemOrden)
    private readonly itemOrdenRepository: Repository<ItemOrden>,
    @InjectRepository(ProductoService)
    private readonly productoService: ProductoService,
  ) { }

  async create(dto: CreateItemOrdeneDto) {
    console.log("creandio item orden dto:", dto);

    try {
      const producto = await this.productoService.findOne(dto.id_producto);
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${dto.id_producto} no existe`);
      }
      const nuevoItem = this.itemOrdenRepository.create({
        cantidad_productos: dto.cantidad_productos,
        // usa el nombre de la propiedad de la entidad
        producto: { id: dto.id_producto } as any,
        //agregado el null y ?
        orden: dto.id_orden ? { id: dto.id_orden } as any : null,
        usuario: { Id_usuario: dto.usuarioId } as any,
      });

      console.log('Guardando item:', nuevoItem);
      const result = await this.itemOrdenRepository.save(nuevoItem);
      console.log('Item guardado:', result);
      return result;
    }catch (error) {
      console.error("Error al crear item orden:", error);
      throw error;
    }
  }

  async findAll(): Promise < ItemOrden[] > {
      return this.itemOrdenRepository.find({ relations: ['producto'] });
    }

  async findOne(id: number): Promise < ItemOrden | null > {//el null es por si no lo encuentra
      return this.itemOrdenRepository.findOne({ where: { id_item_orden: id } });
    }

  async findAllByUser(id_user: number): Promise < ItemOrden[] | null > {//el null es por si no lo encuentra
      return this.itemOrdenRepository.find({
        where: { usuario: { Id_usuario: id_user }, orden: IsNull() },
        relations: ['producto', 'usuario'], // Incluye la relacion con producto 
      });
    }

    update(id: number, updateItemOrdeneDto: UpdateItemOrdeneDto) {
      return this.itemOrdenRepository.update(id, updateItemOrdeneDto)
    }

    //eliminar todos los productos de una orden
    eliminarOrden(idOrden: number) {
      return this.itemOrdenRepository.delete({ id_item_orden: idOrden });
    }

  async vaciarCarrito() {
      return this.itemOrdenRepository.clear(); // Elimina todos los registros de la tabla
    }
  }
