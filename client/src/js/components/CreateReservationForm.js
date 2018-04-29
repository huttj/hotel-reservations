import React from 'react';
import { Mutation } from "react-apollo";
import { format } from 'path';

import '../../less/form.less';
import { CREATE_RESERVATION, LIST_RESERVATIONS } from '../data/queries';


export default () => (
  <Mutation mutation={CREATE_RESERVATION} update={(cache, {data}) => {
    const { listReservations } = cache.readQuery({ query: LIST_RESERVATIONS });
    console.log(data);
    console.log(listReservations);
    cache.writeQuery({
      query: LIST_RESERVATIONS,
      data: {
        listReservations: listReservations.concat(data.createReservation)
      }
    });
  }}>
    {(createReservation, {loading, error, data}) => {      
      let name, hotelName, arrivalDate, departureDate;

      return (
        <div className="create-reservation-form">
          <h3>Create Reservation</h3>
          { error && <p className="error">{error.message}</p> }
          <form onSubmit={(e)=>{
            e.preventDefault();
            if (name.value && hotelName.value && arrivalDate.value && departureDate.value) {
              createReservation({
                variables: {
                  name: name.value,
                  hotelName: hotelName.value,
                  arrivalDate: arrivalDate.value,
                  departureDate: departureDate.value
                }
              });
              name.value = '';
              hotelName.value = '';
              arrivalDate.value = '';
              departureDate.value = '';
            }
          }}>
            <label>
              Name <input type="text" ref={r => name = r} />
            </label>
            <label>
              Hotel <input type="text" ref={r => hotelName = r} />
            </label>

            <label>
              Arrival Date <input type="date" ref={r => arrivalDate = r} />
            </label>
            <label>
              Departure Date <input type="date" ref={r => departureDate = r} />
            </label>

            <button type="submit">Submit</button>

          </form>
        </div>
      );
    }}
  </Mutation>
);
