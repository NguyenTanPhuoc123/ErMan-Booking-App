import {gql} from '@apollo/client';

export const getListServices = gql`
  query GetListService($limit: Int, $after: String) {
    Service_connection(first: $limit, order_by: {id: asc}, after: $after) {
      edges {
        cursor
        node {
          description
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

export const checkServiceNameExist = gql`
  query CheckServiceNameExist($serviceName: String!) {
    Service_connection(where: {serviceName: {_eq: $serviceName}}) {
      edges {
        node {
          description
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

export const addNewService = gql`
  mutation AddNewService(
    $image: String
    $serviceName: String!
    $price: Int!
    $time: Int
    $description: String
  ) {
    insert_Service_one(
      object: {
        description: $description
        image: $image
        price: $price
        serviceName: $serviceName
        time: $time
      }
    ) {
      id
      image
      price
      serviceName
      time
      description
    }
  }
`;

export const UpdateImageService = gql`
  mutation UpdateImageService($id: Int!, $image: String) {
    update_Service_by_pk(pk_columns: {id: $id}, _set: {image: $image}) {
      id
      image
      price
      serviceName
      time
      description
    }
  }
`;

export const UpdateService = gql`
  mutation UpdateService(
    $id: Int!
    $serviceName: String
    $price: Int
    $time: Int
    $description: String
    $image: String
  ) {
    update_Service_by_pk(
      pk_columns: {id: $id}
      _set: {
        image: $image
        price: $price
        serviceName: $serviceName
        time: $time
        description: $description
      }
    ) {
      description
      id
      image
      price
      serviceName
      time
    }
  }
`;

export const DeleteService = gql`
  mutation DeleteService($id: Int!) {
    delete_Service_by_pk(id: $id) {
      id
      description
      image
      price
      serviceName
      time
    }
  }
`;
