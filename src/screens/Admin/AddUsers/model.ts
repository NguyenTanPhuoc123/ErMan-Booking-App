export type FormInfoUserValues = {
    firstname:string;
    lastname:string;
    email:string;
    gender:boolean;
    birthday:string;
    password:string;
    address:string;
    typeAccount: "Customer" | "Staff" | "Admin";
    workPlace:number;
    workStartTime:string;
}
