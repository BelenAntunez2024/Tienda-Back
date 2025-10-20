import { Controller, Put, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Put(':id')
  async actualizarPerfil(@Param('id') id: number, @Body() datos: Partial<Usuario>){
    const usuarioActualizado = await this.usuarioService.actualizarPerfil(id, datos);
    return{
      mensaje: 'Perfil actualizado correctamente',
      usuario: usuarioActualizado
    }
  }
}




  
