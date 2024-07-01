import {gql} from '@apollo/client';

export const GetListUsers = gql`
  query GetListUsers {
    User_connection {
      edges {
        node {
          avatar
          birthday
          firstname
          gender
          id
          isVerified
          lastname
          phone
          typeAccount
        }
      }
    }
  }
`;

export const GetCurrentUser = gql`
  query GetCurrentUser($numberPhone: String) {
    User_connection(where: {phone: {_eq: $numberPhone}}) {
      edges {
        node {
          avatar
          birthday
          firstname
          gender
          id
          isVerified
          lastname
          phone
          typeAccount
          address
        }
      }
    }
  }
`;

export const EditProfile = gql`
  mutation EditProfile(
    $id: Int!
    $firstname: String
    $lastname: String
    $avatar: String
    $birthday: String
    $gender: Boolean
    $address: String
  ) {
    update_User_by_pk(
      pk_columns: {id: $id}
      _set: {
        address: $address
        avatar: $avatar
        birthday: $birthday
        firstname: $firstname
        gender: $gender
        lastname: $lastname
      }
    ) {
      id
      avatar
      firstname
      lastname
      gender
      birthday
      address
      phone
      typeAccount
      isVerified
    }
  }
`;

export const UpdateAvatar = gql`
  mutation EditProfile($id: Int!, $avatar: String) {
    update_User_by_pk(pk_columns: {id: $id}, _set: {avatar: $avatar}) {
      id
      avatar
      firstname
      lastname
      gender
      birthday
      address
      phone
      typeAccount
      isVerified
    }
  }
`;
