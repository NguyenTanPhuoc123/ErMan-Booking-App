import {ApolloClient, InMemoryCache} from '@apollo/client';
import {API, HEADER} from '../constants/api';

const client = new ApolloClient({
  uri: API,
  cache: new InMemoryCache(),
  queryDeduplication: true,
  headers: HEADER,
});

export default client;
