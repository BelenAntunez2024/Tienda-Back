import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseEnumPipe, BadRequestException } from '@nestjs/common';
import { CorreoService } from './correo.service';
import { CorreoDto } from './dto/correo.dto';
import { Correo } from './entities/correo.entity';
import { ClasificacionMensaje } from './clasificacion-mensaje.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';


@Auth(Role.ADMIN)//esto hace que solo los usuarios con role de admin puedan hacer las operaciones en productos
@Controller('correo')
export class CorreoController {
  constructor(private readonly correoService: CorreoService) {}

  @Post() //el validation verifica que los datos enviados cumplan con las reglas definidas en el DTO
  create(@Body(new ValidationPipe({ whitelist: true })) correoDto: CorreoDto): Promise<Correo> {
    return this.correoService.create(correoDto);
  }

  @Get()
  findAll() {
    return this.correoService.findAll();
  }

  //el parseenumpipe valida que el valor del parámetro coincida con uno de los valores definidos en el enum
  @Get('/categoria/:clasificacion')
    filtrarTipoDeMensaje(
      @Param('clasificacion', new ParseEnumPipe(ClasificacionMensaje)) clasificacion: ClasificacionMensaje,
    ): Promise<Correo[]> {
      try{
        return this.correoService.filtrarTipoDeMensaje(clasificacion);
      } catch (error) {
        console.error('Error al filtrar los correos por clasificación:', error);
        throw BadRequestException;
      }
    }

  @Patch(':id')
  update(@Param('id') id: string, @Body() correoDto: CorreoDto) {
    return this.correoService.update(+id, correoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.correoService.remove(+id);
  }
}
