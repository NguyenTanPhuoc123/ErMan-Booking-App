import {gql} from '@apollo/client';

export const GetListBookings = gql`
  query GetListBookings($limit: Int, $after: String, $id: Int) {
    Booking_connection(
      first: $limit
      after: $after
      order_by: {datetimeCreate: desc}
      where: {_or: [{staff: {_eq: $id}}, {customer: {_eq: $id}}]}
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
          Payment {
            id
            name
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

export const UpdateDataFromServer = gql`
  subscription GetListBookings {
    Booking(order_by: {datetimeCreate: desc}) {
      id
      isPaid
      status
      total
      datetimeBooking
      datetimeCreate
      BookingDetails {
        Service {
          description
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
`;

export const CreateNewBooking = gql`
  mutation AddNewBooking(
    $branchId: Int!
    $customerId: Int!
    $staffId: Int!
    $dateTimeBooking: String
    $isPaid: Boolean
    $payment: Int
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
        payment: $payment
      }
    ) {
      affected_rows
    }
  }
`;

export const updateStatusBooking = gql`
  mutation MyMutation($id: Int!, $status: String, $isPaid: Boolean) {
    update_Booking_by_pk(
      pk_columns: {id: $id}
      _set: {status: $status, isPaid: $isPaid}
    ) {
      datetimeBooking
      datetimeCreate
      id
      isPaid
      staff
      status
      total
      userByStaff {
        Staff {
          timeStartWork
          Branch {
            branchName
          }
        }
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
      BookingDetails {
        Service {
          description
          id
          price
          image
          serviceName
          time
        }
        id
      }
    }
  }
`;
