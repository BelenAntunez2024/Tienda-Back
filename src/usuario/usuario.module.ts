import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // 👈 IMPORTANTE
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService], // opcional si lo usás en otros módulos
})
export class UsuariosModule {}