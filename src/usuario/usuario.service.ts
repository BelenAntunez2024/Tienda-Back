import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async registrar(datos: Partial<Usuario>){
    const email = datos.email;
    const contraseña = datos.contraseña;
    const nombreCompleto = datos.nombreCompleto;
    const fechaNacimiento = datos.fechaNacimiento;
    const foto = datos.foto;

    //Verificar si ya existe el usuario con ese mail
    const usuarioExistente = await this.usuariosRepository.findOne({where: {email}})
     if (usuarioExistente){
      throw new BadRequestException ('El email ya esta registradoo')
     }

    //Crear nuevo usuario
    const nuevoUsuario = this.usuariosRepository.create({
      email,
      contraseña,
      nombreCompleto,
      fechaNacimiento,
      foto,
    })

    return this.usuariosRepository.save(nuevoUsuario);

  }

  async actualizarPerfil(id: number, datos: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ Id_usuario : id });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // Validaciones básicas
    if (datos.nombreCompleto && datos.nombreCompleto.trim() === '') {
      throw new BadRequestException('El nombre no puede estar vacío');
    }

    if (datos.contraseña && datos.contraseña.length < 6) {
      throw new BadRequestException('La contraseña debe tener al menos 6 caracteres');
    }

    // Encriptar contraseña si se actualiza
    /*if (datos.contraseña) {
      datos.contraseña = await bcrypt.hash(datos.contraseña, 10);
    }*/

    // Actualizar los campos que vengan en el body
    Object.assign(usuario, datos);

    return this.usuariosRepository.save(usuario);
  }
}
