import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.entity';
import { UserService } from 'src/user/user.service';
import {
  Verification,
  VerificationSchema,
} from 'src/verification/entities/verification.entity';
import { VerificationService } from 'src/verification/verification.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from 'src/Util/NotificationService';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Verification.name, schema: VerificationSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN}
    })
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserService,
    VerificationService,
    NotificationService,
    CloudinaryService
  ],
})
export class AuthenticationModule {}
