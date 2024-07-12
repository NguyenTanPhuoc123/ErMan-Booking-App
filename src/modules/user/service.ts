import {BodyAddStaffParams, Staff, User} from './model';
import auth from '@react-native-firebase/auth';
import client from '../../api';
import * as UserApi from '../../api/user/queries';
export const getListCustomer = async (limit: number, after?: string) => {
  try {
    let res;
    if (after) {
      res = await client.query({
        query: UserApi.getListCustomer,
        variables: {
          limit,
          after,
        },
      });
    } else {
      res = await client.query({
        query: UserApi.getListCustomer,
        variables: {
          limit,
        },
      });
    }
    const hasNextPage = res.data.User_connection.pageInfo.hasNextPage;
    const endCursor = res.data.User_connection.pageInfo.endCursor;
    const listData = res.data.User_connection.edges;
    if (after === endCursor) {
      return;
    }
    const listCustomer: User[] = listData.map((data: any) => {
      const userId = JSON.parse(atob(data.node.id))[3];
      const {id, User, ...newUser} = data.node;
      return {
        id: userId,
        ...newUser,
      };
    }) as User[];
    return {result: {users: listCustomer, hasNextPage, endCursor}};
  } catch (error) {
    console.log('Error get list users: ', error);
    return {error};
  }
};

export const getListStaffs = async (limit: number, after?: string) => {
  try {
    let res;
    if (after) {
      res = await client.query({
        query: UserApi.GetListStaff,
        variables: {
          limit,
          after,
        },
      });
    } else {
      res = await client.query({
        query: UserApi.GetListStaff,
        variables: {
          limit,
        },
      });
    }
    const hasNextPage = res.data.User_connection.pageInfo.hasNextPage;
    const endCursor = res.data.User_connection.pageInfo.endCursor;
    const listData = res.data.User_connection.edges;
    if (after === endCursor) {
      return;
    }
    const listStaff: Staff[] = listData.map((data: any) => {
      const userId = JSON.parse(atob(data.node.id))[3];
      const {id: branchId, ...newBranch} = data.node.Staff.Branch;
      const idBranch = JSON.parse(atob(branchId))[3];
      const workPlace = {id: idBranch, ...newBranch};
      const timeStartWork = data.node.Staff.timeStartWork;
      const {id, Staff, ...newUser} = data.node;
      return {
        id: userId,
        workPlace: workPlace,
        timeStartWork: timeStartWork,
        ...newUser,
      };
    }) as Staff[];
    return {result: {staffs: listStaff, hasNextPage, endCursor}};
  } catch (error) {
    console.log('Error get list staffs: ', error);
    return {error};
  }
};

export const addNewStaff = async (body: BodyAddStaffParams) => {
  try {
    const res = auth()
      .createUserWithEmailAndPassword(body.email, body.password)
      .then(async () => {
        client.mutate({
          mutation: UserApi.AddNewUser,
          variables: {
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            typeAccount: body.typeAccount,
            address: body.address,
            birthday: body.birthday,
            timeStartWork: body.timeStartWork,
            workPlace: body.workPlace,
          },
        });
      });

    return {result: res};
  } catch (error) {
    console.log('Error register: ', error);
    return {error};
  }
};

export const searchStaff = async (search: string) => {
  try {
    const res = await client.query({
      query: UserApi.SearchStaff,
      variables: {search: `%${search}%`},
    });
    const listData = res.data.User_connection.edges;
    const listStaff: Staff[] = listData.map((data: any) => {
      const userId = JSON.parse(atob(data.node.id))[3];
      const {id: branchId, ...newBranch} = data.node.Staff.Branch;
      const idBranch = JSON.parse(atob(branchId))[3];
      const workPlace = {id: idBranch, ...newBranch};
      const timeStartWork = data.node.Staff.timeStartWork;
      const {id, Staff, ...newUser} = data.node;
      return {
        id: userId,
        workPlace: workPlace,
        timeStartWork: timeStartWork,
        ...newUser,
      };
    }) as Staff[];

    return {result: listStaff};
  } catch (error) {
    console.log('Error search stylist: ', error);
    return {error};
  }
};

export const searchCustomer = async (search: string) => {
  try {
    const res = await client.query({
      query: UserApi.SearchCustomer,
      variables: {search: `%${search}%`},
    });
    const listData = res.data.User_connection.edges;
    const listStaff: User[] = listData.map((data: any) => {
      const userId = JSON.parse(atob(data.node.id))[3];
      const {id, ...newUser} = data.node;
      return {
        id: userId,
        ...newUser,
      };
    }) as User[];

    return {result: listStaff};
  } catch (error) {
    console.log('Error search customer: ', error);
    return {error};
  }
};

export const editProfile = async (id: number, workPlace: number) => {
  try {
    const res = await client.mutate({
      mutation: UserApi.EditProfile,
      variables: {
        id: id,
        workPlace: workPlace,
      },
    });

    return {result: res};
  } catch (error) {
    console.log('Error edit user: ', error);
    return {error};
  }
};

export const deleteUser = async (id: number) => {
  try {
    const res = await client.mutate({
      mutation: UserApi.deleteUser,
      variables: {
        id: id,
      },
    });
    return {result: res};
  } catch (error) {
    console.log('Error delete user: ', error);
    return {error};
  }
};
