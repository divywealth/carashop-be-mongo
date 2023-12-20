import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import {
  UserProductSchema,
  Userproduct,
} from 'src/userproduct/entities/userproduct.entity';
import { Address, AddressSchema } from 'src/address/entities/address.entity';
import { Order, OrderSchema } from './entities/order.entity';
import {
  SubOrderSchema,
  Suborder,
} from 'src/suborder/entities/suborder.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { AddressService } from 'src/address/address.service';
import { SuborderService } from 'src/suborder/suborder.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserproductService } from 'src/userproduct/userproduct.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Userproduct.name, schema: UserProductSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Suborder.name, schema: SubOrderSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "30m" },
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    UserService,
    ProductService,
    AddressService,
    UserproductService,
    SuborderService,
    CloudinaryService,
  ],
})
export class OrderModule {}
