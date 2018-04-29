import React from 'react';
import { Query, Mutation } from "react-apollo";
import { DIRECTIVE, LIST } from "graphql/language/kinds";

import '../../less/table.less';
import { LIST_RESERVATIONS, DELETE_RESERVATION } from '../data/queries';
import Debounce from './Debounce';


export default class ReservationList extends React.Component {
  state = {
    name: '',
    hotelName: '',
    arrivalDate: '',
    departureDate: '',
  };

  clear() {
    this.setState({
      name: '',
      hotelName: '',
      arrivalDate: '',
      departureDate: '',
    });
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      });
    };
  }

  getQuery() {
    const query = {};
    for (const key in this.state) {
      if (this.state[key]) {
        query[key] = this.state[key];
      }
    }
    return query;
  }

  render() {
    
    return (
      <div>
        <h3>Review Reservations</h3>
        <div className="filter-reservations">
          <h5>Search</h5>
          <label>
            Name <input type="text" value={this.state.name} onChange={this.update('name')} />
          </label>
          <label>
            Hotel <input type="text" value={this.state.hotelName} onChange={this.update('hotelName')} />
          </label>
          <label>
            Arrival Date <input type="date" value={this.state.arrivalDate} onChange={this.update('arrivalDate')} />
          </label>
          <label>
            Departure Date <input type="date" value={this.state.departureDate} onChange={this.update('departureDate')} />
          </label>
          <button onClick={()=>this.clear()}>Clear</button>
        </div>

        <Debounce timeout={1000}>
          {() => (
            <Query query={LIST_RESERVATIONS} variables={this.getQuery()}>
              {({loading, error, data}) => {

                if (error) return `Error: ${error}`;
              
                return (
                  <table>
                    <thead>
                      <tr>
                        <th className="left-header">Name</th>
                        <th className="left-header">Hotel</th>
                        <th>Arrival Date</th>
                        <th>Departure Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        loading ? <tr><td>Loading...</td></tr> : 
                          data.listReservations.map(r => <ReservationRow key={r.ID} reservation={r} variables={this.getQuery()} />) 
                      }
                    </tbody>
                  </table>
              )}}
            </Query>
          )}
        </Debounce>
      </div>
    );
  }
}

const ReservationRow = ({reservation, index, variables}) => (
  <Mutation mutation={DELETE_RESERVATION} update={(cache) => {
    const { listReservations: unfiltered } = cache.readQuery({ query: LIST_RESERVATIONS });
    const { listReservations: filtered } = cache.readQuery({ query: LIST_RESERVATIONS, variables });
    cache.writeQuery({
      query: LIST_RESERVATIONS,
      data: {
        listReservations: filtered.filter(r => r.ID !== reservation.ID)
      },
      variables
    });
    cache.writeQuery({
      query: LIST_RESERVATIONS,
      data: {
        listReservations: unfiltered.filter(r => r.ID !== reservation.ID)
      }
    });
  }}>
    {(deleteReservation, data) => (
      <tr>
        <td>{reservation.name}</td>
        <td>{reservation.hotelName}</td>
        <td className="date-cell">{new Date(reservation.arrivalDate).toLocaleDateString()}</td>
        <td className="date-cell">{new Date(reservation.departureDate).toLocaleDateString()}</td>
        <td className="delete-cell" onClick={()=>{
          if (data.loading) return;
          if (confirm('Delete this reservation?')) {
            deleteReservation({ variables: reservation });
          }
        }}>{data.loading ? 'Deleting...' : 'Delete'}</td>
      </tr>
      )
    }
  </Mutation>
);
