import { Module } from '@nestjs/common';
import { CorreoService } from './correo.service';
import { CorreoController } from './correo.controller';
import { Correo } from './entities/correo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Correo])],
  controllers: [CorreoController],
  providers: [CorreoService],
})
export class CorreoModule {}
