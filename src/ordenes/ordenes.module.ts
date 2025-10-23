import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordenes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ordenes])],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}

