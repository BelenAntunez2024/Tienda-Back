import { Injectable } from '@nestjs/common';
import { CreateOrdeneDto } from './dto/create-ordene.dto';
import { UpdateOrdeneDto } from './dto/update-ordene.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ordenes } from './entities/ordenes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdenesService {
  constructor(
        @InjectRepository(Ordenes)
        private readonly ordenesRepository: Repository<Ordenes>,
    ) {}
    
  create(createOrdeneDto: CreateOrdeneDto) {
    return 'This action adds a new ordene';
  }

  findAll(): Promise<Ordenes[]> {
    return this.ordenesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} ordene`;
  }


  update(id: number, updateOrdeneDto: UpdateOrdeneDto) {
    return `This action updates a #${id} ordene`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordene`;
  }
}
