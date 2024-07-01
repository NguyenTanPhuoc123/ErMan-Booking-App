import {Pagination} from '../../constants/type';
import {IActionCallback} from '../base';
import {User} from '../user/model';

export const ROOT_MODULE = 'branch';
export const GET_LIST_BRANCHS = `${ROOT_MODULE}/GET_LIST_BRANCHS`;
export const SEARCH_BRANCH = `${ROOT_MODULE}/SEARCH_BRANCH`;
export interface Branch {
  id: number;
  image: string;
  branchName: string;
  openTime: string;
  closeTime: string;
  address: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  rate: 1 | 2 | 3 | 4 | 5;
}
export interface IBranchState {
  branchs: Array<Branch>;
  hasNextPage: boolean;
  endCursor?: string;
}

export interface IActionGetListBranch extends IActionCallback {
  endCursor?: string;
  page?: number;
  limit?: number;
}

export interface IActionSaveListBranch {
  branchs: Branch[];
  hasNextPage: boolean;
  endCursor?: string;
}

export interface IActionSearchBranch extends IActionCallback {
  limit?: number;
  search: string;
}
