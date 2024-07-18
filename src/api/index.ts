import {ApolloClient, InMemoryCache, split, HttpLink} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {API, HEADER, WEB_SOCKET} from '../constants/api';

const httpLink = new HttpLink({
  uri: API,
  headers: HEADER,
});

const webSocketLink = new WebSocketLink({
  uri: WEB_SOCKET,
  options: {
    reconnect: true,
    connectionParams: {
      headers: HEADER,
    },
  },
});

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  webSocketLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default client;
