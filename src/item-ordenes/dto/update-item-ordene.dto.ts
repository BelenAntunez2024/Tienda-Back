import { PartialType } from '@nestjs/mapped-types';
import { CreateItemOrdeneDto } from './create-item-ordene.dto';

export class UpdateItemOrdeneDto extends PartialType(CreateItemOrdeneDto) {}
