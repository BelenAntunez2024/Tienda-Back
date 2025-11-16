import { Module } from '@nestjs/common';
import { CorreoService } from './correo.service';
import { CorreoController } from './correo.controller';
import { Correo } from './entities/correo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './emailCorreo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Correo])],
  controllers: [CorreoController],
  providers: [CorreoService, EmailService],
})
export class CorreoModule {}
