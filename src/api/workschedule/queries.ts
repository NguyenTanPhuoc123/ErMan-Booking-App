import {gql} from '@apollo/client';

export const GetListWorkSchedule = gql`
  query GetListWorkSchedule($idStaff: Int!) {
    WorkSchedule_connection(
      first: 10
      order_by: {id: asc}
      where: {staffId: {_eq: $idStaff}}
    ) {
      edges {
        node {
          dayWork
          id
          staffId
          timeEnd
          timeStart
        }
      }
    }
  }
`;
