import { Document } from 'mongoose';

export interface Car extends Document {
  readonly make_name: string;
  readonly model_name: string;
  readonly mileage: number;
  readonly driver_name: string;
}
