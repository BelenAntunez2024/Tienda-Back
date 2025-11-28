import { Module } from '@nestjs/common';
import { ItemOrdenesService } from './item-ordenes.service';
import { ItemOrdenesController } from './item-ordenes.controller';
import { ItemOrden } from './entities/item-ordene.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from '../producto/producto.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemOrden]),
    ProductoModule,
  ],
  controllers: [ItemOrdenesController],
  providers: [ItemOrdenesService],
  exports: [ItemOrdenesService],
})
export class ItemOrdenesModule {}
