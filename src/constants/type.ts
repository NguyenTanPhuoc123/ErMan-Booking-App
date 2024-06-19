export interface Pagination<T>{
    count:number;
    results:Array<T>;
    next?: string;
    previous?: string;
}