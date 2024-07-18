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
          dateBooking
          timeBooking
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

export const GetListAllBookings = gql`
  query GetListAllBookings {
    Booking_connection(order_by: {datetimeCreate: desc}) {
      edges {
        node {
          id
          isPaid
          status
          total
          dateBooking
          timeBooking
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
    }
  }
`;

export const UpdateDataFromServer = gql`
  subscription GetListBookings {
    Booking_connection(order_by: {datetimeCreate: desc}) {
      edges {
        node {
          id
          isPaid
          status
          total
          dateBooking
          timeBooking
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
    $dateBooking: String
    $timeBooking: String
    $isPaid: Boolean
    $payment: Int
    $total: Int
    $bookingDetails: [BookingDetail_insert_input!]!
  ) {
    insert_Booking(
      objects: {
        branch: $branchId
        customer: $customerId
        dateBooking: $dateBooking
        timeBooking: $timeBooking
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
      dateBooking
      timeBooking
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

export const getListBooked = gql`
  query GetListBooked($staffId: Int!, $dateBooking: String) {
    Booking_connection(
      order_by: {datetimeCreate: desc}
      where: {
        _and: [
          {staff: {_eq: $staffId}}
          {dateBooking: {_eq: $dateBooking}}
          {status: {_in: ["upcoming", "ongoing"]}}
        ]
      }
    ) {
      edges {
        cursor
        node {
          id
          isPaid
          status
          total
          dateBooking
          timeBooking
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
    }
  }
`;

export const editBooking = gql`
  mutation EditBooking(
    $id: Int!
    $branchId: Int!
    $customerId: Int!
    $staffId: Int!
    $dateBooking: String
    $timeBooking: String
    $isPaid: Boolean
    $payment: Int
    $total: Int
  ) {
    update_Booking_by_pk(
      pk_columns: {id: $id}
      _set: {
        branch: $branchId
        customer: $customerId
        dateBooking: $dateBooking
        timeBooking: $timeBooking
        isPaid: $isPaid
        staff: $staffId
        status: "upcoming"
        total: $total
        payment: $payment
      }
    ) {
      Payment {
        id
        name
      }
      User {
        address
        avatar
        birthday
        email
        firstname
        id
        isVerified
        lastname
        typeAccount
      }
      dateBooking
      datetimeCreate
      id
      isPaid
      status
      timeBooking
      total
      userByStaff {
        address
        avatar
        birthday
        email
        firstname
        id
        isVerified
        lastname
        typeAccount
        Staff {
          Branch {
            address
            branchName
            closeTime
            description
            id
            image
            openTime
          }
          timeStartWork
        }
      }
    }
  }
`;

export const GetListBookingsByBranch = gql`
  query GetListBookingsByBranch($branchId: Int) {
    Booking_connection(
      order_by: {datetimeCreate: desc}
      where: {branch: {_eq: $branchId}, status: {_neq: "canceled"}}
    ) {
      edges {
        node {
          id
          isPaid
          status
          total
          dateBooking
          timeBooking
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
    }
  }
`;
