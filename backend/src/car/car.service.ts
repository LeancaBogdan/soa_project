import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './interfaces/car.interface';
import { CreateCarDTO } from './dto/create-car.dto';

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  async addCar(createCarDTO: CreateCarDTO): Promise<Car> {
    const newCar = await new this.carModel(createCarDTO);
    return newCar.save();
  }

  async getCar(carId): Promise<Car> {
    const car = await this.carModel.findById(carId).exec();
    return car;
  }

  async getCars(): Promise<Car[]> {
    const cars = await this.carModel.find().exec();
    return cars;
  }

  async editCar(carId, createCarDTO: CreateCarDTO): Promise<Car> {
    const editedCar = await this.carModel.findByIdAndUpdate(
      carId,
      createCarDTO,
      { new: true },
    );
    return editedCar;
  }

  async deleteCar(carId): Promise<any> {
    const deletedCar = await this.carModel.findByIdAndRemove(carId);
    return deletedCar;
  }
}
