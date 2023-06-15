import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsResolver } from './hotels.resolver';

@Module({
  providers: [HotelsResolver, HotelsService]
})
export class HotelsModule {}
