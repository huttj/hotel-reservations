export default function ReservationModel(mongoose) {
  const ReservationSchema = mongoose.Schema({
    name: { type: String, required: true },
    hotelName: { type: String, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
  });

  ReservationSchema.post('find', async result => {
    if (Array.isArray(result)) {
      console.log(result);
      result.forEach(r => r.ID = r._id || r.ID);
    } else {
      result.ID = result._id || result.ID;
    }
    return result;
  });

  ReservationSchema.pre('save', async result => {
    result._id = result.ID || result._id;
    return result;
  });

  ReservationSchema.post('save', async result => {
    result.ID = result._id || result.ID;
    return result;
  });

  const ReservationModel = mongoose.model('Reservation', ReservationSchema);

  return ReservationModel;
} 