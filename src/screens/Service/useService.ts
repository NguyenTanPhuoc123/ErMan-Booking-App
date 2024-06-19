import {useRoute} from '@react-navigation/native';
import {createRef, useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {getListService} from '../../modules/service';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IServiceState} from '../../modules/service/model';
import NavigationActionService from '../../navigation/navigation';
import {ApiError} from '../../constants/api';

const useService = () => {
  const categoryRef = createRef<FlatList>();
  const serviceListRef = createRef<FlatList>();
  const route = useRoute();
  const dispatch = useDispatch();
  const {services} = useSelector<RootState, IServiceState>(
    state => state.service,
  );
  const [refresh, setRefresh] = useState(false);
  const onLoadServiceSuccess = () => {
    NavigationActionService.hideLoading();
    setRefresh(false);
    
  };
  const onLoadServiceFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    console.log(error?.message);
  };
  useEffect(() => {
    NavigationActionService.showLoading();
    dispatch(
      getListService({
        page: 1,
        limit: 4,
        onSuccess: onLoadServiceSuccess,
        onFail: onLoadServiceFail,
      }),
    );
    
  }, []);
  const pullRefresh = useCallback(() => {
    setRefresh(true);
    dispatch(
      getListService({
        page: 1,
        limit: 4,
        onSuccess: onLoadServiceSuccess,
        onFail: onLoadServiceFail,
      }),
    );
    
  }, []);
  return {categoryRef, serviceListRef, route, pullRefresh, refresh, services};
};

export default useService;
