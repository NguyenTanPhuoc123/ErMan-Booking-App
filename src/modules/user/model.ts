
export const ROOT_MODULE = "user:";

export interface User{
    id:string;
    avatar:string;
    firstname:string;
    lastname:string;
    phone: string;
    gender:boolean;
    birthday:string;
    address:string;
    isVerified: boolean;
    typeAccount: "Customer" | "Staff" | "Admin";
};