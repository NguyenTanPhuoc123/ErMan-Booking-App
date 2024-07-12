import {createRef, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IUserState, User} from '../../../modules/user/model';
import {getListCustomer, searchCustomer} from '../../../modules/user';
import {FlatList} from 'react-native';
import {debounce} from 'lodash';
import {ApiError} from '../../../constants/api';

const useUserManager = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const {users} = useSelector<RootState, IUserState>(state => state.user);
  const listUserRef = createRef<FlatList>();
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (search == '') {
      getListCustomers();
    } else {
      searchCustomers();
    }
  }, [refresh, search]);

  const pullRefresh = () => {
    setRefresh(true);
  };

  const loadSuccess = () => {
    setRefresh(false);
    setLoading(false);
  };

  const loadFail = () => {
    setRefresh(false);
    setLoading(false);
  };

  const getListCustomers = () => {
    dispatch(
      getListCustomer({
        page: 1,
        limit: 10,
        onSuccess: loadSuccess,
        onFail: loadFail,
      }),
    );
  };

  const searchCustomers = debounce(() => {
    dispatch(
      searchCustomer({
        search: search,
        onSuccess: value => {
          setCustomers(value);
          setLoading(false);
        },
        onFail: (error?: ApiError) => {
          setLoading(false);
        },
      }),
    );
  }, 500);

  return {
    listUserRef,
    users,
    refresh,
    pullRefresh,
    search,
    setSearch,
    loading,
    customers,
  };
};

export default useUserManager;
