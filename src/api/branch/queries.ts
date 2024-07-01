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
