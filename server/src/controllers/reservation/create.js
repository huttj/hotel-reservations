import { Reservation } from '../../models';

export default async function createReservation(req, res, next) {
  try {

    const result = await Reservation.create(req.body);

    res.send(result);

  } catch (e) {
    next(e);
  }
}