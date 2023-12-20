import { Module } from '@nestjs/common';
import { SuborderService } from './suborder.service';
import { SuborderController } from './suborder.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubOrderSchema, Suborder } from './entities/suborder.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { Order, OrderSchema } from 'src/order/entities/order.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Suborder.name, schema: SubOrderSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [SuborderController],
  providers: [SuborderService, CloudinaryService, ProductService, OrderService],
})
export class SuborderModule {}
