import { Module } from '@nestjs/common';
import { ItemOrdenesService } from './item-ordenes.service';
import { ItemOrdenesController } from './item-ordenes.controller';
import { ItemOrden } from './entities/item-ordene.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ItemOrden]),
],
  controllers: [ItemOrdenesController],
  providers: [ItemOrdenesService],
  exports: [ItemOrdenesService],
})
export class ItemOrdenesModule {}
