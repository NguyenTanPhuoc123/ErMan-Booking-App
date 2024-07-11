import {Branch} from './model';
import * as BranchApi from '../../api/branch/queries';
import client from '../../api';
import storage from '@react-native-firebase/storage';

export const getListBranchs = async (after?: string, limit = 4) => {
  try {
    let res;
    if (after) {
      res = await client.query({
        query: BranchApi.GetListBranchs,
        variables: {limit, after},
      });
    } else {
      res = await client.query({
        query: BranchApi.GetListBranchs,
        variables: {limit},
      });
    }

    const listData = res.data.Branch_connection.edges;
    const hasNextPage = res.data.Branch_connection.pageInfo.hasNextPage;
    const endCursor = res.data.Branch_connection.pageInfo.endCursor;
    if (endCursor === after) {
      console.log('Error Cursor');
      return;
    }
    const listBranch: Branch[] = listData.map((data: any) => {
      const branchId = JSON.parse(atob(data.node.id))[3];
      const {id, ...newBranch} = data.node;
      return {id: branchId, ...newBranch};
    }) as Branch[];

    return {result: {branchs: listBranch, hasNextPage, endCursor}};
  } catch (error) {
    console.log('Error get list branch: ', error);
    return {error};
  }
};

export const searchBranch = async (search: string) => {
  try {
    const res = await client.query({
      query: BranchApi.searchBranch,
      variables: {search: `%${search}%`},
    });
    const listData = res.data.Branch_connection.edges;
    const listBranch: Branch[] = listData.map((data: any) => {
      const branchId = JSON.parse(atob(data.node.id))[3];
      const {id, ...newBranch} = data.node;
      return {id: branchId, ...newBranch};
    }) as Branch[];

    return {result: listBranch};
  } catch (error) {
    console.log('Error search branch: ', error);
    return {error};
  }
};

export const checkBranchExist = async (branchName: string) => {
  try {
    const res = await client.query({
      query: BranchApi.CheckBranchNameExist,
      variables: {branchName: `${branchName}`},
    });
    const service = res.data.Branch_connection.edges[0];

    return {result: service};
  } catch (error) {
    console.log('Error check exist branch name: ', error);
    return {error};
  }
};

export const addNewBranch = async (
  branchName: string,
  openTime: string,
  closeTime: string,
  address: string,
  image?: string,
  description?: string,
) => {
  try {
    const res = await client.mutate({
      mutation: BranchApi.AddNewBranch,
      variables: {
        branchName: branchName,
        openTime: openTime,
        closeTime: closeTime,
        address: address,
        image: image,
        description: description,
      },
    });

    const branchId = res.data.insert_Branch_one.id;
    const id = JSON.parse(atob(branchId))[3];

    if (image) {
      saveImageServiceInStorage(id, branchName, image);
    }

    return {result: res};
  } catch (error) {
    console.log('Error add new branch: ', error);
    return {error};
  }
};

const saveImageServiceInStorage = async (
  id: number,
  branchName: string,
  path: string,
) => {
  try {
    storage()
      .ref(`branchs/${id}_${branchName}/${id}_${branchName}_image`)
      .putFile(path)
      .then(async () => {
        await storage()
          .ref(`branchs/${id}_${branchName}/${id}_${branchName}_image`)
          .getDownloadURL()
          .then(async value => {
            await client.mutate({
              mutation: BranchApi.UpdateImageBranch,
              variables: {id: id, image: value},
            });
          });
      });
  } catch (error) {
    console.log('Error save image service, because ', error);
  }
};

export const updateBranch = async (branch: Branch) => {
  try {
    if (branch.image) {
      saveImageServiceInStorage(branch.id, branch.branchName, branch.image);
    }
    const res = await client.mutate({
      mutation: BranchApi.UpdateBranch,
      variables: {
        id: branch.id,
        branchName: branch.branchName,
        openTime: branch.openTime,
        closeTime: branch.closeTime,
        image: branch.image,
        address: branch.address,
        description: branch.description,
      },
    });

    return {result: res};
  } catch (error) {
    console.log('Error update branch: ', error);
  }
};

export const deleteBranch = async (id: number) => {
  try {
    const res = await client.mutate({
      mutation: BranchApi.DeleteBranch,
      variables: {
        id,
      },
    });

    return {result: res};
  } catch (error) {
    console.log('Error delete branch: ', error);
    return {error};
  }
};
