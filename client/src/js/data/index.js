import ApolloClient from 'apollo-boost';
import { BACKEND_URL } from '../../constants.json';

export default new ApolloClient({ uri: BACKEND_URL });
