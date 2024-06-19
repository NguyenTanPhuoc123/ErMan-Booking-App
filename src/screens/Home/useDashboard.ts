import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getListService } from "../../modules/service";
import { RootState } from "../../redux/reducers";
import { IServiceState } from "../../modules/service/model";
import { IAuthState } from "../../modules/auth/model";

const useDasboard = ()=>{
    const dispatch = useDispatch();
    const currentUser = useSelector<RootState, IAuthState>(
        state => state.auth,
      ).userData;
    const {services} = useSelector<RootState,IServiceState>(state=>state.service);
    useEffect(()=>{
        dispatch(getListService({page:1,limit:4}));
    },[])

    return{
        currentUser,
        services,
    }
}

export default useDasboard;