import mongoose from 'mongoose';
import ReservationModel from './reservation';

mongoose.connect(process.env.MONGO_URL);

export const Reservation = ReservationModel(mongoose);

export default mongoose;