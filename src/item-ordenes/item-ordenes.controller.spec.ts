import { Test, TestingModule } from '@nestjs/testing';
import { ItemOrdenesController } from './item-ordenes.controller';
import { ItemOrdenesService } from './item-ordenes.service';

describe('ItemOrdenesController', () => {
  let controller: ItemOrdenesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemOrdenesController],
      providers: [ItemOrdenesService],
    }).compile();

    controller = module.get<ItemOrdenesController>(ItemOrdenesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
