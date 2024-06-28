import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { IServiceState } from "../../../modules/service/model";
import { createRef, useEffect, useState } from "react";
import { getListService } from "../../../modules/service";
import { FlatList } from "react-native";

const useServiceManager = () =>{
    const dispatch = useDispatch();
    const {services} = useSelector<RootState,IServiceState>(state=> state.service);
    const listServiceRef = createRef<FlatList>();
    const [refresh,setRefresh] = useState(false);
    const onGetSuccess = ()=>{
        setRefresh(false);
    }

    const onGetFail = ()=>{
        setRefresh(false);
    }

    useEffect(()=>{
        setRefresh(true);
        dispatch(getListService({
            limit:3,
            onSuccess:onGetSuccess,
            onFail:onGetFail
        }));
    },[])

    const pullRequest = ()=>{
        setRefresh(true);
        dispatch(getListService({
            limit:3,
            onSuccess:onGetSuccess,
            onFail:onGetFail
        }));
    }

    return{services,listServiceRef,refresh,pullRequest};
};


export default useServiceManager;