import gql from 'graphql-tag';

export const LIST_RESERVATIONS = gql`
  query listReservations(
    $name: String,
    $hotelName: String,
    $arrivalDate: String,
    $departureDate: String
  ) {
    listReservations(
      name: $name,
      hotelName: $hotelName,
      arrivalDate: $arrivalDate,
      departureDate: $departureDate,
    ) {
      ID
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

export const CREATE_RESERVATION = gql`
  mutation createReservation(
    $name: String!,
    $hotelName: String!,
    $arrivalDate: String!,
    $departureDate: String!
  ) {
    createReservation(input: {
      name: $name,
      hotelName: $hotelName,
      arrivalDate: $arrivalDate,
      departureDate: $departureDate
    }) {
      ID
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

export const DELETE_RESERVATION = gql`
  mutation deleteReservation($ID: ID!) {
    deleteReservation(ID: $ID)
  }
`;