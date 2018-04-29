import resolvers from './resolvers';
import {makeExecutableSchema} from 'graphql-tools';

const typeDefs = `
  type Reservation {
    ID: ID
    name: String!
    hotelName: String!
    arrivalDate: String
    departureDate: String
  }

  type Query {
    getReservation(ID: ID): Reservation
    listReservations(hotelName: String, name: String, arrivalDate: String, departureDate: String): [Reservation]
  }

  input CreateReservationInput {
    name: String!
    hotelName: String!
    arrivalDate: String!
    departureDate: String!
  }

  input UpdateReservationInput {
    ID: ID!
    name: String
    hotelName: String
    arrivalDate: String
    departureDate: String
  }

  type Mutation {
    createReservation(input: CreateReservationInput): Reservation
    updateReservation(input: UpdateReservationInput): Reservation
    deleteReservation(ID: ID!): String
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;