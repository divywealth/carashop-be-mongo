import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { UserproductModule } from './userproduct/userproduct.module';
import { OrderModule } from './order/order.module';
import { SuborderModule } from './suborder/suborder.module';
import { VerificationModule } from './verification/verification.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env.${process.env.NODE_ENV}`
    }),
    MongooseModule.forRoot('mongodb+srv://looner_user:fordwinwam@loonercluster.oj3oeqg.mongodb.net/carashop-local?retryWrites=true&w=majority'),
    UserModule,
    AddressModule,
    ProductModule,
    UserproductModule,
    OrderModule,
    SuborderModule,
    VerificationModule,
    AuthenticationModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
