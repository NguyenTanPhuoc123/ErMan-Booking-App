import {gql} from '@apollo/client';

export const GetListBookings = gql`
  query GetListBookings($limit: Int, $after: String) {
    Booking_connection(
      first: $limit
      after: $after
      order_by: {datetimeCreate: desc}
    ) {
      edges {
        cursor
        node {
          id
          isPaid
          status
          total
          datetimeBooking
          datetimeCreate
          BookingDetails {
            Service {
              description
              discount
              id
              image
              price
              serviceName
              time
            }
            id
          }
          User {
            address
            avatar
            birthday
            email
            firstname
            gender
            id
            isVerified
            lastname
            typeAccount
          }
          Branch {
            address
            branchName
            closeTime
            description
            id
            image
            openTime
          }
          userByStaff {
            Staff {
              User {
                address
                avatar
                birthday
                email
                firstname
                gender
                id
                isVerified
                lastname
                typeAccount
              }
              timeStartWork
              workPlace
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GetListBookingsSubscription = gql`
  subscription GetListBookings($limit: Int, $after: String) {
    Booking_connection(
      first: $limit
      after: $after
      order_by: {datetimeCreate: desc}
    ) {
      edges {
        node {
          id
          isPaid
          status
          total
          datetimeBooking
          datetimeCreate
          BookingDetails {
            Service {
              description
              discount
              id
              image
              price
              serviceName
              time
            }
            id
          }
          User {
            address
            avatar
            birthday
            email
            firstname
            gender
            id
            isVerified
            lastname
            typeAccount
          }
          Branch {
            address
            branchName
            closeTime
            description
            id
            image
            openTime
          }
          userByStaff {
            Staff {
              User {
                address
                avatar
                birthday
                email
                firstname
                gender
                id
                isVerified
                lastname
                typeAccount
              }
              timeStartWork
              workPlace
            }
          }
        }
      }
    }
  }
`;

export const CreateNewBooking = gql`
  mutation AddNewBooking(
    $branchId: Int!
    $customerId: Int!
    $staffId: Int!
    $dateTimeBooking: String
    $isPaid: Boolean
    $total: Int
    $bookingDetails: [BookingDetail_insert_input!]!
  ) {
    insert_Booking(
      objects: {
        branch: $branchId
        customer: $customerId
        datetimeBooking: $dateTimeBooking
        isPaid: $isPaid
        staff: $staffId
        status: "upcoming"
        total: $total
        BookingDetails: {data: $bookingDetails}
      }
    ) {
      affected_rows
    }
  }
`;
