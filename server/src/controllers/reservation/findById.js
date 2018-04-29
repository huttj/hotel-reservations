import { Reservation } from '../../models';

export default async function findReservationById(req, res, next) {
  try {

    const { id } = req.params;

    const result = await Reservation.findById(id);

    res.send(result);

  } catch (e) {
    next(e);
  }
}