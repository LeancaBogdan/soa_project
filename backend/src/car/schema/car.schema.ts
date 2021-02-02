import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
  make_name: String,
  model_name: String,
  mileage: Number,
  driver_name: String,
});
