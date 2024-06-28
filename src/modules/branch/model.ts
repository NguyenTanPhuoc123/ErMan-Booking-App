import { IActionCallback } from "../base";
import { User } from "../user/model";

export const ROOT_MODULE = 'branch';
export const GET_LIST_BRANCHS = `${ROOT_MODULE}/GET_LIST_BRANCHS`;
export const SEARCH_BRANCH = `${ROOT_MODULE}/SEARCH_BRANCH`;
export interface Branch {
    id:string;
    image:string;
    branchName:string;
    openTime: string;
    closeTime: string;
    address:string;
    comments?:Comment[]
}

export interface Comment {
    id:number;
    user:User;
    content:string;
    rate: 1|2|3|4|5;
}
export interface IBranchState {
    branchs:Branch[];
}

export interface IActionGetListBranch extends IActionCallback{
    q?:string;
    page?:number;
    limit?:number;
}

export interface IActionSaveListBranch {
    branchs:Branch[];
}

export interface IActionSearchBranch extends IActionCallback {
    q?:string;
    limit?:number;
    search:string;
}