import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './car/car.controller';
import { CarService } from './car/car.service';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/soa-backend', {
      useNewUrlParser: true,
    }),
    CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
