import gql from 'graphql-tag';

export const GetListNotifications = gql`
  query GetListNotifications($receiverId: Int, $limit: Int, $after: String) {
    Notification_connection(
      first: $limit
      order_by: {createTime: desc}
      after: $after
      where: {receiver: {_eq: $receiverId}}
    ) {
      edges {
        cursor
        node {
          id
          createTime
          isRead
          message
          title
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
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GetRealTimeNotification = gql`
  subscription GetRealTimeNotifications($receiverId: Int) {
    Notification_connection(
      order_by: {createTime: desc}
      where: {receiver: {_eq: $receiverId}}
    ) {
      edges {
        node {
          id
          createTime
          isRead
          message
          title
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
        }
      }
    }
  }
`;

export const CreateNotification = gql`
  mutation CreateNotification(
    $title: String
    $message: String
    $receiver: Int
  ) {
    insert_Notification_one(
      object: {title: $title, message: $message, receiver: $receiver}
    ) {
      id
      createTime
      isRead
      message
      receiver
      title
    }
  }
`;

export const UpdateStatusRead = gql`
  mutation UpdateStatusRead($id: Int!) {
    update_Notification_by_pk(pk_columns: {id: $id}, _set: {isRead: true}) {
      createTime
      id
      isRead
      message
      receiver
      title
    }
  }
`;
