import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { IUserState } from "../../../modules/user/model";
import { useEffect } from "react";
import { getListCustomer } from "../../../modules/user";
import { useSubscription } from "@apollo/client";


const useDasboard = ()=>{
    const dispatch = useDispatch();
    const {users} = useSelector<RootState,IUserState>(state=>state.user);
    useEffect(()=>{
        dispatch(getListCustomer({
            page:1,
            limit:20,
            onSuccess:()=>{},
            onFail:()=>{}
        }))
    },[]);

    return {users};
}

export default useDasboard;