import { Controller, Put, Body, Param, Post, HttpCode, HttpStatus, Get, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { UsuarioDto } from './dto/usuario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { LoginDto } from './dto/login.dto';
import { ActiveUsuario } from 'src/common/decorators/active-usuario.decorator'

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
  async login(@Body() datos: LoginDto){
    const usuarioLogueado = await this.usuarioService.login(
      datos.email, datos.password);
      return{
        mensaje: "Login Existoso",
        usuarioLogueado,
      };
  }

  //Lista todos los usuarios
  @Auth(Role.ADMIN)//esto hace que solo los usuarios con role de admin puedan hacer las operaciones en productos
  @Get()
  async listaUsuarios() {
    return this.usuarioService.listaUsuarios();
  }
  
  //Obtener usuario por ID
  @Auth(Role.ADMIN)//esto hace que solo los usuarios con role de admin puedan hacer las operaciones en productos
  @Get(':id')
  async obtenerUsuario(@Param('id') id: number){
    return this.usuarioService.obtenerUsuario(id);
  }

   //Actualizacion perfil
  @Auth(Role.USUARIO)
  @Put(":id") 
  async actualizarPerfil(@Param("id") id: number, @ActiveUsuario() usuario: Usuario, @Body() datos: Partial<Usuario>) {
  const usuarioActualizado = await this.usuarioService.actualizarPerfil(usuario.Id_usuario, datos);
  return {
    mensaje: 'Perfil actualizado correctamente',
    usuario: usuarioActualizado,
  };
}

  //Eliminar usuario
  @Delete(':id')
  async eliminarUsuario(@Param('id') id:number){
    await this.usuarioService.eliminarUsuario(id);
    return {mensaje: 'Usuario eliminado correctamente'}
  }
}




  
