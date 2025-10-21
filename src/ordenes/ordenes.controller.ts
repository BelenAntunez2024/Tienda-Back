import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';

@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  create(@Body() createOrdeneDto: CreateOrdeneDto) {
    return this.ordenesService.create(createOrdeneDto);
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
  update(@Param('id') id: string, @Body() updateOrdeneDto: UpdateOrdeneDto) {
    return this.ordenesService.update(+id, updateOrdeneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenesService.remove(+id);
  }
}
