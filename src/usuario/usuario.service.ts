import { Injectable } from '@nestjs/common';

import {UsuarioDto } from './dto/usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
 constructor(
    @InjectRepository(Usuario)
    //el injectRepository lo que hace es decirle a nest que quiero usar la tabla Producto
    private usuarioRepository: Repository<Usuario>,
  ) {}

  
  async findAll(): Promise<Usuario[]> {
    console.log('Obteniendo todos los usuarios');
    return this.usuarioRepository.find();
  }

   create(UsuarioDto: UsuarioDto) {
    return 'This action adds a new usuario';
  }
  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, UsuarioDto: UsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
