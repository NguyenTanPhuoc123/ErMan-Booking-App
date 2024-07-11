import {gql} from '@apollo/client';

export const GetListBranchs = gql`
  query GetListBranch($limit: Int, $after: String) {
    Branch_connection(first: $limit, after: $after, order_by: {id: asc}) {
      edges {
        node {
          address
          branchName
          closeTime
          description
          id
          image
          openTime
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const searchBranch = gql`
  query SearchBranch($search: String!) {
    Branch_connection(
      where: {
        _or: [{address: {_ilike: $search}}, {branchName: {_ilike: $search}}]
      }
      order_by: {id: asc}
    ) {
      edges {
        node {
          address
          branchName
          closeTime
          description
          id
          image
          openTime
        }
      }
    }
  }
`;

export const CheckBranchNameExist = gql`
  query CheckBranchNameExist($branchName: String) {
    Branch_connection(where: {branchName: {_eq: $branchName}}) {
      edges {
        node {
          address
          branchName
          closeTime
          description
          id
          image
          openTime
        }
      }
    }
  }
`;

export const AddNewBranch = gql`
  mutation AddNewBranch(
    $branchName: String!
    $image: String
    $openTime: String!
    $closeTime: String
    $address: String!
    $description: String
  ) {
    insert_Branch_one(
      object: {
        image: $image
        openTime: $openTime
        description: $description
        address: $address
        branchName: $branchName
        closeTime: $closeTime
      }
    ) {
      address
      branchName
      closeTime
      description
      id
      image
      openTime
    }
  }
`;

export const UpdateImageBranch = gql`
  mutation UpdateImageBranch($id: Int!, $image: String) {
    update_Branch_by_pk(pk_columns: {id: $id}, _set: {image: $image}) {
      id
      image
      openTime
      address
      branchName
      closeTime
      description
    }
  }
`;

export const UpdateBranch = gql`
  mutation UpdateBranch(
    $id: Int!
    $image: String
    $branchName: String
    $openTime: String
    $closeTime: String
    $address: String
    $description: String
  ) {
    update_Branch_by_pk(
      pk_columns: {id: $id}
      _set: {
        image: $image
        address: $address
        branchName: $branchName
        closeTime: $closeTime
        openTime: $openTime
        description: $description
      }
    ) {
      id
      image
      openTime
      address
      branchName
      closeTime
      description
    }
  }
`;

export const DeleteBranch = gql`
  mutation DeleteBranch($id: Int!) {
    delete_Branch_by_pk(id: $id) {
      address
      branchName
      closeTime
      description
      id
      image
      openTime
    }
  }
`;
