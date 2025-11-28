import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    ClienteModule
  ], //IMPORTANTE- esto sirve para que la entidad de Usuario aparezca en la BD
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService], //se exporta para que el modulo de auth lo pueda utilizar
})
export class UsuariosModule { }