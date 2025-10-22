import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordenes.entity';
import { Repository } from 'typeorm';
import { OrdenesDto } from './dto/ordenes.dto';

@Injectable()
export class OrdenesService {
  constructor(
        @InjectRepository(Ordenes)
        private readonly ordenesRepository: Repository<Ordenes>,
    ) {}
    
  create(ordenesDto: OrdenesDto) {
    return 'This action adds a new ordene';
  }

  findAll(): Promise<Ordenes[]> {
    return this.ordenesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} ordene`;
  }


  update(id: number, updateOrdenesDto: OrdenesDto) {
    return `This action updates a #${id} ordene`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordene`;
  }
}
