import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/producto.dto';
import { Producto } from './entities/producto.entity';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Get(':id') //el param es para obtener el id de la url
  async findOne(@Param('id') id: number): Promise<Producto | null> {
    return this.productoService.findOne(id);
  }

  //el post es para crear nuevos recursos
  @Post()
  async create(@Body() productoDto: ProductoDto) {
    return this.productoService.create(productoDto);
  }

  //el patch es para actualizaciones parciales
  @Patch(':id') //el body es para obtener los datos del cuerpo de la peticion
  async update(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) productoDto: ProductoDto): Promise<Producto> { //el ValidationPipe es para validar y transformar los datos entrantes - el transform: true es para transformar el id de string a number
    return this.productoService.update(id, productoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productoService.remove(id);
  }
}
