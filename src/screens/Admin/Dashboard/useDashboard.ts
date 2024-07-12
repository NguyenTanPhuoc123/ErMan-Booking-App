import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {IUserState} from '../../../modules/user/model';
import {useEffect} from 'react';
import {getListCustomer, getListStaff} from '../../../modules/user';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';

const useDasboard = () => {
  const dispatch = useDispatch();

  const users = useSelector<RootState, IUserState>(
    state => state.user,
  ).users.filter(user=> user.typeAccount === 'Staff');
  useEffect(() => {
    dispatch(
      getListStaff({
        page: 1,
        limit: 20,
        onSuccess: () => {},
        onFail: () => {},
      }),
    );
  }, []);

  const lineCharData: ChartData = {
    labels: ['01-07-2024', '02-07-2024', '03-07-2024', '04-07-2024', '05-07-2024', '06-07-2024', '07-07-2024'],
    datasets: [
      {
        data: [15, 19, 10, 20,12,18,15],
        color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
        strokeWidth:2,
      },
    ],
  };
  
  return {users,lineCharData};
};

export default useDasboard;
