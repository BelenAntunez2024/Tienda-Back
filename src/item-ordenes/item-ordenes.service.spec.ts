import { Test, TestingModule } from '@nestjs/testing';
import { ItemOrdenesService } from './item-ordenes.service';

describe('ItemOrdenesService', () => {
  let service: ItemOrdenesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemOrdenesService],
    }).compile();

    service = module.get<ItemOrdenesService>(ItemOrdenesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
