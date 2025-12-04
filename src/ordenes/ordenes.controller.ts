import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesDto } from './dto/ordenes.dto';
import { ItemOrdenesService } from 'src/item-ordenes/item-ordenes.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('ordenes')
export class OrdenesController {
  constructor(
    private readonly ordenesService: OrdenesService,
  ) {}

  @Auth(Role.USUARIO)
  @Post()
  create(@Body() ordenesDto: OrdenesDto) {
    return this.ordenesService.create(ordenesDto);
  }

  @Auth(Role.USUARIO)
  @Get()
  async findAll() {
    const ordenes = await this.ordenesService.findAll();    
      if (ordenes.length === 0) { // Si no hay ordenes, lanzar una excepción 204 No Content
          throw new HttpException('No Content', HttpStatus.NO_CONTENT); 
      }
        
    return ordenes; // Devolver la lista de ordenes si existen y codigo 200 OK
  }

  @Auth(Role.USUARIO)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(+id);
  }

  @Auth(Role.USUARIO)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdeneDto: OrdenesDto) {
    return this.ordenesService.update(+id, updateOrdeneDto);
  }
  
  @Auth(Role.USUARIO)
  @Get('historial/:id')
  findByUser(@Param('id', ParseIntPipe) id: number) {
    return this.ordenesService.findByUser(+id);
  }

}
