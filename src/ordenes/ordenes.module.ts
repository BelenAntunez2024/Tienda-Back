import { Module } from '@nestjs/common';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordenes.entity';
import { ProductoModule } from 'src/producto/producto.module';
import { ItemOrdenesModule } from 'src/item-ordenes/item-ordenes.module';
import { ItemOrden } from 'src/item-ordenes/entities/item-ordene.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Ordenes, ItemOrden]),
    ProductoModule, 
    ItemOrdenesModule
  ],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}

