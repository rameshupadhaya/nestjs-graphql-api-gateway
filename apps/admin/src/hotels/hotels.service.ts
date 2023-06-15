import { Injectable } from '@nestjs/common';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Injectable()
export class HotelsService {
  create(createHotelInput: CreateHotelInput) {
    return { exampleField: 14 };
  }

  findAll() {
    return `This action returns all hotels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  update(id: number, updateHotelInput: UpdateHotelInput) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
