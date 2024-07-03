import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IUserState} from '../../../modules/user/model';
import {getListUser} from '../../../modules/user';

const useUserManager = () => {
  const dispatch = useDispatch();
  const {users} = useSelector<RootState, IUserState>(state => state.user);
  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    dispatch(
      getListUser({
        onSuccess: loadSuccess,
        onFail: loadFail,
      }),
    );
  }, [refresh]);
  const [routes] = useState([
    {
      key: 'admin',
      title: 'Quản trị viên',
    },
    {
      key: 'staff',
      title: 'Nhân viên',
    },
    {
      key: 'customer',
      title: 'Khách hàng',
    },
  ]);

  const pullRefresh = () => {
    setRefresh(true);
  };

  const loadSuccess = () => {
    setRefresh(false);
  };

  const loadFail = () => {
    setRefresh(false);
  };

  return {index, setIndex, routes, users, refresh, pullRefresh};
};

export default useUserManager;
