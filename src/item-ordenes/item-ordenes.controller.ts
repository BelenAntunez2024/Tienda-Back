import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ItemOrdenesService } from './item-ordenes.service';
import { CreateItemOrdeneDto } from './dto/create-item-ordene.dto';
import { UpdateItemOrdeneDto } from './dto/update-item-ordene.dto';

@Controller('item-ordenes')
export class ItemOrdenesController {
  constructor(private readonly itemOrdenesService: ItemOrdenesService) {}

  @Post()
  create(@Body() createItemOrdeneDto: CreateItemOrdeneDto) {
    return this.itemOrdenesService.create(createItemOrdeneDto);
  }

  @Get()
  findAll() {
    return this.itemOrdenesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemOrdenesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemOrdeneDto: UpdateItemOrdeneDto) {
    return this.itemOrdenesService.update(+id, updateItemOrdeneDto);
  }
  //elimina un solo item de orden
  

  @Delete('orden/:id')
  eliminarOrden(@Param('id', ParseIntPipe) id: number) {
    return this.itemOrdenesService.eliminarOrden(+id);
  }
}
