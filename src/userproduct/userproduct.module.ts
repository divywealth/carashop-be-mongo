import { Module } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { UserproductController } from './userproduct.controller';

@Module({
  controllers: [UserproductController],
  providers: [UserproductService]
})
export class UserproductModule {}
