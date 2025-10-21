import { Controller, Put, Body, Param, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDto } from './dto/usuario.dto';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('registro')
  @HttpCode(HttpStatus.CREATED)
  async registrar(@Body() datos: UsuarioDto | Partial<Usuario>){
    return this.usuarioService.registrar(datos);
  }

  @Put(':id')
  async actualizarPerfil(@Param('id') id: number, @Body() datos: Partial<Usuario>){
    const usuarioActualizado = await this.usuarioService.actualizarPerfil(id, datos);
    return{
      mensaje: 'Perfil actualizado correctamente',
      usuario: usuarioActualizado
    }
  }
}




  
