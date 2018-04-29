import { Reservation } from '../../models';

export default async function findReservationById(req, res, next) {
  try {

    const { hotelName, arrivalDate, departureDate } = req.query;

    const results = await Reservation.find({ hotelName, arrivalDate, departureDate });

    res.send(results);

  } catch (e) {
    next(e);
  }
}