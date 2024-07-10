import {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IUserState} from '../../../modules/user/model';
import {FlatList} from 'react-native';
import {getListStaff} from '../../../modules/user';

const useStaffManage = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const listtusers = useSelector<RootState, IUserState>(
    state => state.user,
  ).users.filter(user=> user.typeAccount === 'Staff');
  const listStaffRef = createRef<FlatList>();
  console.log("load");
  
  useEffect(() => {
    dispatch(
      getListStaff({
        page: 1,
        limit: 10,
        onSuccess: loadSuccess,
        onFail: loadFail,
      }),
    );
  }, [refresh]);

  const pullRefresh = () => {
    setRefresh(true);
  };

  const loadSuccess = () => {
    setRefresh(false);
  };

  const loadFail = () => {
    setRefresh(false);
  };

  return {listStaffRef, pullRefresh, refresh,listtusers};
};
export default useStaffManage;
