import { Module } from '@nestjs/common';
import { ItemOrdenesService } from './item-ordenes.service';
import { ItemOrdenesController } from './item-ordenes.controller';

@Module({
  controllers: [ItemOrdenesController],
  providers: [ItemOrdenesService],
})
export class ItemOrdenesModule {}
