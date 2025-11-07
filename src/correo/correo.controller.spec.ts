import { Test, TestingModule } from '@nestjs/testing';
import { CorreoController } from './correo.controller';
import { CorreoService } from './correo.service';

describe('CorreoController', () => {
  let controller: CorreoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorreoController],
      providers: [CorreoService],
    }).compile();

    controller = module.get<CorreoController>(CorreoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
