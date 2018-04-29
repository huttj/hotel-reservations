import pick from 'lodash/pick';
import { Reservation } from '../../models';

export default async function list(req, res, next) {
  try {

    const query = pick(req.query, ['name', 'hotelName', 'arrivalDate', 'departureDate']);

    if (query.name) {
      query.name = {
        $regex: query.name, $options: 'i'
      }
    }
    if (query.hotelName) {
      query.hotelName = {
        $regex: query.hotelName, $options: 'i'
      }
    }

    const results = await Reservation.find(query);

    res.send(results);

  } catch (e) {
    next(e);
  }
}