import {gql} from '@apollo/client';

export const getListServices = gql`
  query GetListService($limit: Int, $after: String) {
    Service_connection(first: $limit, order_by: {id: asc}, after: $after) {
      edges {
        cursor
        node {
          description
          discount
          id
          image
          price
          serviceName
          time
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const searchService = gql`
  query SearchService($serviceName: String) {
    Service_connection(
      order_by: {id: asc}
      where: {serviceName: {_ilike: $serviceName}}
    ) {
      edges {
        node {
          description
          discount
          id
          image
          price
          serviceName
          time
        }
      }
    }
  }
`;
