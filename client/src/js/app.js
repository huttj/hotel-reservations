import React from 'react';
import { ApolloProvider } from "react-apollo";

import client from './data';

import ReservationList from './pages/ReservationList';

export default () => (
  <ApolloProvider client={client}>
    <ReservationList/>
  </ApolloProvider>
);