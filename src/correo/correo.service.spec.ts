import { Test, TestingModule } from '@nestjs/testing';
import { CorreoService } from './correo.service';

describe('CorreoService', () => {
  let service: CorreoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorreoService],
    }).compile();

    service = module.get<CorreoService>(CorreoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
