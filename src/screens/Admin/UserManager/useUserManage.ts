import {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IUserState} from '../../../modules/user/model';
import {getListCustomer} from '../../../modules/user';
import { FlatList } from 'react-native';

const useUserManager = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);     
  const listtusers = useSelector<RootState, IUserState>(
    state => state.user,
  ).users.filter(user=> user.typeAccount === 'Customer');
  const listUserRef = createRef<FlatList>();

  useEffect(() => {
    dispatch(
      getListCustomer({
        page:1,
        limit:10,
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

  return {listUserRef,listtusers,refresh, pullRefresh};
};

export default useUserManager;
