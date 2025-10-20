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
