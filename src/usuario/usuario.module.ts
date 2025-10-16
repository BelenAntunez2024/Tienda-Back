import { Module } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { UsuariosController } from './usuario.controller';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
