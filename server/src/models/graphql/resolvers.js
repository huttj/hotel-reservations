import { Reservation }  from '../index';

const resolvers = {
  Query: {
    getReservation: (root, {ID}) => Reservation.findById(ID),
    listReservations: (root, query) => {
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
      return Reservation.find(query);
    },
  },
  Mutation: {
    createReservation: (root, {input}) => Reservation.create(input),
    updateReservation: (root, {input}) => Reservation.findByIdAndUpdate(input.ID, input),
    deleteReservation: (root, {ID}) => Reservation.remove({ _id: ID }).then(() => `Reservation with id ${ID} has been deleted.`),
  }
}

export default resolvers;