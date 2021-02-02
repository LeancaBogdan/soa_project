import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './schema/car.schema';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }])],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: '/car/car' },
        { method: RequestMethod.PUT, path: '/car/car' },
        { method: RequestMethod.DELETE, path: '/car/car' },
      );
  }
}
