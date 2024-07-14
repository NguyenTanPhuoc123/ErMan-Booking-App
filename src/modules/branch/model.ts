import {IActionCallback} from '../base';
import {User} from '../user/model';

export const ROOT_MODULE = 'branch';
export const GET_LIST_BRANCHS = `${ROOT_MODULE}/GET_LIST_BRANCHS`;
export const SEARCH_BRANCH = `${ROOT_MODULE}/SEARCH_BRANCH`;
export const CHECK_BRANCH_EXIST = `${ROOT_MODULE}/CHECK_BRANCH_EXIST`;
export const ADD_NEW_BRANCH = `${ROOT_MODULE}/ADD_NEW_BRANCH`;
export const UPDATE_BRANCH = `${ROOT_MODULE}/UPDATE_BRANCH`;
export const DELETE_BRANCH = `${ROOT_MODULE}/DELETE_BRANCH`;
export interface Branch {
  id: number;
  image: string;
  branchName: string;
  openTime: string;
  closeTime: string;
  address: string;
  description?: string;
}

export interface IBranchState {
  branchs: Array<Branch>;
  hasNextPage: boolean;
  endCursor?: string;
}

export interface IActionGetListBranch extends IActionCallback {
  endCursor?: string;
  page: number;
  limit: number;
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

export interface IActionCheckBranchExist extends IActionCallback {
  branchName: string;
}

export interface IActionCreateNewBranchPayload extends IActionCallback {
  branchName: string;
  openTime: string;
  closeTime: string;
  image?: string;
  description?: string;
  address: string;
}

export interface IActionUpdateBranchPayload extends IActionCallback {
  branch: Branch;
}

export interface IActionDeleteBranchPayload extends IActionCallback {
  branchId: number;
}

export interface IActionRemoveBranchPayload extends IActionCallback {
  id: number;
}
