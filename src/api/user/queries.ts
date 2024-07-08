import {gql} from '@apollo/client';

export const onAuthStateChanged = gql`
  subscription onAuthStateChanged($id: Int) {
    User(where: {id: {_eq: $id}}) {
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
      Staff {
        timeStartWork
        Branch {
          branchName
        }
      }
    }
  }
`;

export const Register = gql`
  mutation Register($firstname: String!, $lastname: String!, $email: String!) {
    insert_User_one(
      object: {
        avatar: ""
        birthday: ""
        firstname: $firstname
        lastname: $lastname
        isVerified: true
        email: $email
        typeAccount: "Customer"
        gender: true
        address: ""
      }
      on_conflict: {constraint: User_email_key}
    ) {
      id
      avatar
      firstname
      lastname
      gender
      birthday
      email
      isVerified
      address
      typeAccount
    }
  }
`;

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
          email
          typeAccount
        }
      }
    }
  }
`;

export const GetCurrentUser = gql`
  query MyQuery($email: String!) {
    User_connection(where: {email: {_eq: $email}}) {
      edges {
        node {
          id
          firstname
          lastname
          isVerified
          email
          typeAccount
          avatar
          address
          birthday
          gender
          Staff {
            timeStartWork
            Branch {
              branchName
            }
          }
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
      email
      typeAccount
      isVerified
    }
  }
`;

export const AddNewUser = gql`
  mutation CreateNewUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $typeAccount: String
  ) {
    insert_User_one(
      object: {
        avatar: ""
        birthday: ""
        firstname: $firstname
        lastname: $lastname
        isVerified: true
        email: $email
        typeAccount: $typeAccount
        gender: true
        address: ""
      }
      on_conflict: {constraint: User_email_key}
    ) {
      id
      avatar
      firstname
      lastname
      gender
      birthday
      email
      isVerified
      address
      typeAccount
    }
  }
`;

export const AddInfoStaff = gql`
  mutation AddStaffInfo($timeStartWork: String, $workPlace: Int) {
    insert_User_one(
      object: {
        Staff: {data: {timeStartWork: $timeStartWork, workPlace: $workPlace}}
      }
    ) {
      Staff {
        id
        timeStartWork
        workPlace
      }
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
      email
      typeAccount
      isVerified
    }
  }
`;

export const GetListStaff = gql`
  query GetListStaff($limit: Int, $after: String) {
    User_connection(
      order_by: {id: asc}
      where: {typeAccount: {_eq: "Staff"}}
      first: $limit
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          firstname
          lastname
          email
          typeAccount
          gender
          birthday
          avatar
          address
          isVerified
          Staff {
            timeStartWork
            Branch {
              branchName
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

export const SearchStaff = gql`
  query SearchStaf($search: String) {
    User_connection(
      where: {
        typeAccount: {_eq: "Staff"}
        _or: [
          {firstname: {_ilike: $search}}
          {lastname: {_ilike: $search}}
          {Staff: {workPlace: {_ilike: $search}}}
        ]
      }
      order_by: {id: asc}
    ) {
      edges {
        node {
          id
          firstname
          lastname
          avatar
          gender
          birthday
          address
          email
          isVerified
          Staff {
            timeStartWork
            workPlace
          }
          typeAccount
        }
      }
    }
  }
`;
