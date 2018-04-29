import React from 'react';
import CreateReservationForm from '../components/CreateReservationForm';
import ReservationList from '../components/ReservationList';

export default () => (
  <div>
    <h1>Hotel Reservations</h1>
    <CreateReservationForm/>
    <ReservationList/>
  </div>
);

