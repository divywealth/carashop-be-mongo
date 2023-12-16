import { Module } from '@nestjs/common';
import { SuborderService } from './suborder.service';
import { SuborderController } from './suborder.controller';

@Module({
  controllers: [SuborderController],
  providers: [SuborderService]
})
export class SuborderModule {}
