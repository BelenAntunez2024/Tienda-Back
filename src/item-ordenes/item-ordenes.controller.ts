import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req } from '@nestjs/common';
import { ItemOrdenesService } from './item-ordenes.service';
import { ItemOrdeneDto } from './dto/item-ordene.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUsuario } from 'src/common/decorators/active-usuario.decorator';

@Auth(Role.USUARIO)
@Controller('item-ordenes')
export class ItemOrdenesController {
  constructor(private readonly itemOrdenesService: ItemOrdenesService) {}

  @Post()
  create(@ActiveUsuario() usuario: any, @Body() ItemOrdenDto: ItemOrdeneDto) {
    console.log(ItemOrdenDto, "dto");
    ItemOrdenDto.usuarioId = usuario.id;
    return this.itemOrdenesService.create(ItemOrdenDto);
  }

  @Get()
  @Auth(Role.USUARIO)
  findAll(@ActiveUsuario() usuario: any) {
    return this.itemOrdenesService.findAllByUser(usuario.id);
  }

  @Get('carrito/:id_user')
  findAllByUser(@Param('id_user') id_user: string) {
    console.log(id_user, "usuario");
    return this.itemOrdenesService.findAllByUser(+id_user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemOrdenesService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() ItemOrdeneDto: ItemOrdeneDto) {
    return this.itemOrdenesService.update(+id,ItemOrdeneDto);
  }

  //elimina un solo item de orden
  @Delete('orden/:id')
  eliminarOrden(@Param('id', ParseIntPipe) id: number) {
    return this.itemOrdenesService.eliminarOrden(+id);
    
  }

  //esto vacía TODO el carrito luego de que la orden haya sido realizada
  @Delete('vaciar-carrito/:id')
  async vaciar(@Param('id', ParseIntPipe) id: number) {
    await this.itemOrdenesService.vaciarCarrito(id);
    return { message: 'Carrito vaciado exitosamente' };
  }
}
