import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesDto } from './dto/ordenes.dto';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  create(@Body() ordenesDto: OrdenesDto) {
    return this.ordenesService.create(ordenesDto);
  }

  @Post('/comprar')
  @HttpCode(HttpStatus.CREATED) // Respuesta 201 en caso de éxito
  @UsePipes(new ValidationPipe({ transform: true })) // Garantiza la validación
  async procesarCompra(@Body() compra: { items: any[]; userId: number }) {
      const ordenCreada = await this.ordenesService.procesarCompra(compra.items, compra.userId);
      return ordenCreada;
  }

  @Get()
  async findAll() {
    const ordenes = await this.ordenesService.findAll();    
      if (ordenes.length === 0) { // Si no hay ordenes, lanzar una excepción 204 No Content
          throw new HttpException('No Content', HttpStatus.NO_CONTENT); 
      }
        
    return ordenes; // Devolver la lista de ordenes si existen y codigo 200 OK
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdeneDto: OrdenesDto) {
    return this.ordenesService.update(+id, updateOrdeneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenesService.remove(+id);
  }
}
