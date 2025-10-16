import { Module } from '@nestjs/common';
import { CorreoService } from './correo.service';
import { CorreoController } from './correo.controller';

@Module({
  controllers: [CorreoController],
  providers: [CorreoService],
})
export class CorreoModule {}
