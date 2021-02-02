import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Post('/car')
  async addCar(@Res() result, @Body() createCarDTO: CreateCarDTO) {
    console.log(createCarDTO);
    const newCar = await this.carService.addCar(createCarDTO);
    return result.status(HttpStatus.OK).json({
      message: 'Car has been created successfully!',
      car: newCar,
    });
  }

  @Get('/car/:carId')
  async getCar(@Res() result, @Param('carId', new ValidateObjectId()) carId) {
    const car = await this.carService.getCar(carId);
    if (!car) {
      throw new NotFoundException('Car was not found!');
    }
    return result.status(HttpStatus.OK).json(car);
  }

  @Get('/cars')
  async getCars(@Res() result) {
    const cars = await this.carService.getCars();
    return result.status(HttpStatus.OK).json(cars);
  }

  @Put('/car')
  async editCar(
    @Res() result,
    @Query('carId', new ValidateObjectId()) carId,
    @Body() createCarDTO: CreateCarDTO,
  ) {
    const editedCar = await this.carService.editCar(carId, createCarDTO);
    if (!editedCar) {
      throw new NotFoundException('Car was not found!');
    }
    return result.status(HttpStatus.OK).json({
      message: 'Car has been successfully updated',
      car: editedCar,
    });
  }

  @Delete('/car')
  async deleteCar(
    @Res() result,
    @Query('carId', new ValidateObjectId()) carId,
  ) {
    const deletedCar = await this.carService.deleteCar(carId);
    if (!deletedCar) {
      throw new NotFoundException('Car was not found!');
    }
    return result.status(HttpStatus.OK).json({
      message: 'Car has been deleted',
      car: deletedCar,
    });
  }
}
