import { Controller, Put, Body, Param, Post, HttpCode, HttpStatus, Get, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDto } from './dto/usuario.dto';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  //Crear Usuario.
  @Post('registro')
  @HttpCode(HttpStatus.CREATED)
  async registrar(@Body() datos: UsuarioDto | Partial<Usuario>){
    return this.usuarioService.registrar(datos);
  }

  ///Login
  @Post('Login')
  async login(@Body() datos: {email: string, contraseña: string}){
    const usuarioLogueado = await this.usuarioService.login(
      datos.email, datos.contraseña);
      return{
        mensaje: "Login Existoso",
        usuarioLogueado,
      };
  }

  //Lista todos los usuarios
  @Get()
  async listaUsuarios() {
    return this.usuarioService.listaUsuarios();
  }
  //Obtener usuario por ID
  @Get(':id')
  async obtenerUsuario(@Param('id') id: number){
    return this.usuarioService.obtenerUsuario(id);
  }

   //Actualizacion perfil
  @Put(':id')
  async actualizarPerfil(@Param('id') id: number, @Body() datos: Partial<Usuario>){
    const usuarioActualizado = await this.usuarioService.actualizarPerfil(id, datos);
    return{
      mensaje: 'Perfil actualizado correctamente',
      usuario: usuarioActualizado
    }
  }
  //Eliminar usuario
  @Delete(':id')
  async eliminarUsuario(@Param('id') id:number){
    await this.usuarioService.eliminarUsuario(id);
    return {mensaje: 'Usuario eliminado correctamente'}
  }
}




  
