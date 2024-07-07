import {ApolloClient, InMemoryCache,split,HttpLink} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities';
import {API, HEADER, WS_LINK} from '../constants/api';

const httpLink = new HttpLink({
  uri:API,
  headers:HEADER
});

const webSocketLink = new WebSocketLink({
  uri:WS_LINK,
  options:{
    reconnect:true,
    connectionParams:{
      headers:HEADER
    }
  }
})

const splitLink = split( ({query})=>{
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
},webSocketLink,httpLink);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  queryDeduplication: true,
});

export default client;
