import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductoService {
  //el constructor inyecta el repositorio de Producto
  constructor(
    @InjectRepository(Producto)
    //el injectRepository lo que hace es decirle a nest que quiero usar la tabla Producto
    private productoRepository: Repository<Producto>,
  ) {}

  //metodos CRUD basicos
  //obtener todos los productos
  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  //obtener un producto por id
  async findOne(id: number): Promise<Producto|null> {//el null es por si no lo encuentra
    return this.productoRepository.findOne({where: {id_producto: id}});
  }

  //crear un nuevo producto y verificar si ya existe por nombre
  async create(productoDto: ProductoDto): Promise<Producto> {
    //generamos validacion para que el stock no sea negativo
    if (productoDto.stock < 0) {
      throw new BadRequestException(`El stock no puede ser negativo.`);
    }

    //verificamos si el producto ya existe por nombre
    const existente = await this.productoRepository.findOne({
      where: {nombre: productoDto.nombre}
    });
    
    if (existente) { //si ya existe, lanzamos una excepcion
      throw new NotFoundException(`El producto ${productoDto.nombre} ya existe.`);
    }

    //si no existe, lo creamos y lo guardamos
    const producto = await this.productoRepository.create(productoDto);
    return this.productoRepository.save(producto);
  }

  //actualizar un producto y verificar si existe
  async update(id: number, productoDto: ProductoDto): Promise<Producto> {
    //generamos validacion para que el stock no sea negativo
    if (productoDto.stock !== undefined && productoDto.stock < 0) {
      throw new BadRequestException(`El stock no puede ser negativo.`);
    }

    //verificamos si el producto existe por id
    const producto = await this.productoRepository.findOne({
      where: {id_producto: id}
    });

    //si no existe, se indica mediante un mensaje
    if (!producto) {
      throw new NotFoundException(`El producto con id ${id} no fue encontrado.`);
    }

    //actualizamos el producto si existe y guardamos los cambios
    const productoActualizado = this.productoRepository.merge(producto, productoDto);
    return this.productoRepository.save(productoActualizado);
  }
  

  //eliminar un producto
  async remove(id: number) {
    await this.productoRepository.delete(id);
  }

  //este nuevo metodo lo que hace es validar el stock de los productos antes de que el usuario lo agregue al carrito - verifica si la cantidad solicitada es menor o igual al stock disponible
  async validarStock(id: number, cantidadSolicitada: number): Promise<{mensaje: string}> { //el {mensaje: string} es para devolver un mensaje indicando si hay stock o no
    //verificamos si el producto existe por su id
    const producto = await this.productoRepository.findOne({
      where: {id_producto: id}
    });

    //si no existe, lanzamos un mensaje indicando que no se ha encontrado el producto
    if (!producto ) {
      throw new NotFoundException(`El producto con id ${id} no fue encontrado.`);
    }

    //verificamos si el stock es suficiente, se indica mediante un mensaje
    if (producto.stock < cantidadSolicitada) {
    throw new BadRequestException(`Stock insuficiente. Stock disponible: ${producto.stock}`);
    }

    //si hay stock suficiente, devolvemos un mensaje indicando que hay stock
    return {mensaje: 'Stock suficiente. Producto agregado al carrito.'};
  }
}
