import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CorreoService } from './correo.service';
import { CorreoDto } from './dto/correo.dto';

@Controller('correo')
export class CorreoController {
  constructor(private readonly correoService: CorreoService) {}

  @Post()
  create(@Body() correoDto: CorreoDto) {
    return this.correoService.create(CorreoDto);
  }

  @Get()
  findAll() {
    return this.correoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.correoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() correoDto: CorreoDto) {
    return this.correoService.update(+id, CorreoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.correoService.remove(+id);
  }
}
