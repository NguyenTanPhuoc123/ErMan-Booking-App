import {Branch} from './model';
import * as BranchApi from '../../api/branch/queries';
import client from '../../api';
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
