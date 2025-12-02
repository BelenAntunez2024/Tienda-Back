import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/producto.dto';
import { Producto } from './entities/producto.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';


@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get('filtrar-por-nombre') 
  async search(@Query('nombre') nombre: string): Promise<Producto[]> {
    return this.productoService.searchByName(nombre);
  }

  @Auth(Role.USUARIO)
  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Auth(Role.USUARIO)
  @Get(':id') //el param es para obtener el id de la url
  async findOne(@Param('id') id: number): Promise<Producto | null> {
    return this.productoService.findOne(id);
  }

  //el post es para crear nuevos recursos
  @Auth(Role.ADMIN)//esto hace que solo los usuarios con role de admin puedan hacer las operaciones en productos
  @Post()
  async create(@Body() productoDto: ProductoDto) {
    return this.productoService.create(productoDto);
  }

  //el patch es para actualizaciones parciales
  @Auth(Role.ADMIN)
  @Patch(':id') //el body es para obtener los datos del cuerpo de la peticion
  async update(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) productoDto: ProductoDto): Promise<Producto> { //el ValidationPipe es para validar y transformar los datos entrantes - el transform: true es para transformar el id de string a number
    return this.productoService.update(id, productoDto);
  }
  
  @Auth(Role.ADMIN)
  @Patch(':id/stock') //ruta para actualizar solo el stock
  async restarStock(@Param('id') id: number, @Body('cantidad') cantidad: number): Promise<Producto> {
    return this.productoService.actualizarStock(id, cantidad); //por defecto devuelve 200 OK
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productoService.remove(id);
  }
}
