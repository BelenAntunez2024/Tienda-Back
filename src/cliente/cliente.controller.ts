import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() clienteDto: ClienteDto) {
      return this.clienteService.create(clienteDto);
    }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id') //el param es para obtener el id de la url
  async findOne(@Param('id') id: number): Promise<Cliente | null> {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: ClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
