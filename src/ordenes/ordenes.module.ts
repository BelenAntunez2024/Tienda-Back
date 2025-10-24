import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordenes.entity';
import { ProductoModule } from 'src/producto/producto.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Ordenes]),
    ProductoModule, 
  ],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}

