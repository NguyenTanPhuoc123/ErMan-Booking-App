import {gql} from '@apollo/client';

export const onAuthStateChanged = gql`
  subscription onAuthStateChanged($id: Int) {
    User_connection(where: {id: {_eq: $id}}) {
      edges {
        node {
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
`;

export const Register = gql`
  mutation Register($firstname: String!, $lastname: String!, $email: String!) {
    insert_User_one(
      object: {
        firstname: $firstname
        lastname: $lastname
        isVerified: true
        email: $email
        typeAccount: "Customer"
      }
      on_conflict: {constraint: User_email_key}
    ) {
      id
      avatar
      firstname
      lastname
      birthday
      email
      isVerified
      address
      typeAccount
    }
  }
`;

export const GetCurrentUser = gql`
  query GetCurrentUser($email: String!) {
    User_connection(where: {email: {_eq: $email}}) {
      edges {
        node {
          id
          firstname
          lastname
          avatar
          birthday
          address
          email
          isVerified
          Staff {
            timeStartWork
            Branch {
              address
              branchName
              closeTime
              description
              id
              image
              openTime
            }
          }
          typeAccount
        }
      }
    }
  }
`;

export const EditProfile = gql`
  mutation EditProfile($id: Int!, $workPlace: Int) {
    update_Staff_by_pk(pk_columns: {id: $id}, _set: {workPlace: $workPlace}) {
      id
      timeStartWork
      workPlace
    }
  }
`;

export const AddNewUser = gql`
  mutation AddNewStaff(
    $firstname: String
    $lastname: String
    $email: String
    $typeAccount: String
    $address: String
    $birthday: String
    $timeStartWork: String
    $workPlace: Int
  ) {
    insert_User_one(
      object: {
        firstname: $firstname
        lastname: $lastname
        isVerified: true
        email: $email
        typeAccount: $typeAccount
        address: $address
        birthday: $birthday
        Staff: {data: {timeStartWork: $timeStartWork, workPlace: $workPlace}}
      }
    ) {
      address
      avatar
      birthday
      email
      firstname
      isVerified
      id
      lastname
      typeAccount
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
      where: {typeAccount: {_neq: "Customer"}}
      first: $limit
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          firstname
          lastname
          avatar
          birthday
          address
          email
          isVerified
          Staff {
            timeStartWork
            Branch {
              address
              branchName
              closeTime
              description
              id
              image
              openTime
            }
          }
          typeAccount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
export const getListCustomer = gql`
  query GetListCustomer($limit: Int, $after: String) {
    User_connection(
      order_by: {id: asc}
      where: {typeAccount: {_eq: "Customer"}}
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
          birthday
          avatar
          address
          isVerified
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
  query SearchStaff($search: String) {
    User_connection(
      where: {
        typeAccount: {_neq: "Customer"}
        _or: [
          {firstname: {_ilike: $search}}
          {lastname: {_ilike: $search}}
          {email: {_ilike: $search}}
          {Staff: {Branch: {branchName: {_ilike: ""}}}}
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
          birthday
          address
          email
          isVerified
          Staff {
            timeStartWork
            Branch {
              address
              branchName
              closeTime
              description
              id
              image
              openTime
            }
          }
          typeAccount
        }
      }
    }
  }
`;

export const SearchCustomer = gql`
  query SearchCustomer($search: String) {
    User_connection(
      where: {
        typeAccount: {_eq: "Customer"}
        _or: [
          {firstname: {_ilike: $search}}
          {lastname: {_ilike: $search}}
          {email: {_ilike: $search}}
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
          birthday
          address
          email
          isVerified
          typeAccount
        }
      }
    }
  }
`;

export const CheckEmailExist = gql`
  query CheckEmailExist($email: String!) {
    User_connection(where: {email: {_eq: $email}}) {
      edges {
        node {
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
`;

export const deleteUser = gql`
  mutation DeleteUser($id: Int!) {
    delete_User_by_pk(id: $id) {
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
        id
        timeStartWork
        workPlace
      }
    }
  }
`;
