import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Verification,
  VerificationSchema,
} from './entities/verification.entity';
import { User, UserSchema } from 'src/user/schema/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Verification.name, schema: VerificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
