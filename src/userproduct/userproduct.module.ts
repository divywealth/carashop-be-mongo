import { Module } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { UserproductController } from './userproduct.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProductSchema, Userproduct } from './entities/userproduct.entity';
import { User, UserSchema } from 'src/user/schema/user.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Userproduct.name, schema: UserProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserproductController],
  providers: [
    UserproductService,
    UserService,
    ProductService,
    CloudinaryService,
  ],
})
export class UserproductModule {}
