import {useDispatch, useSelector} from 'react-redux';
import NavigationActionService from '../../navigation/navigation';
import {RootState} from '../../redux/reducers';
import {INotificationState} from '../../modules/notification/model';
import {createRef, useEffect} from 'react';
import {getListNotifications} from '../../modules/notification';
import {FlatList} from 'react-native';
import {MessageType, PopupType} from '../../component/CustomPopup/type';
import {ApiError} from '../../constants/api';

const useNotification = () => {
  const dispatch = useDispatch();
  const {notifications} = useSelector<RootState, INotificationState>(
    state => state.notification,
  );
  const listNotificationRef = createRef<FlatList>();

//   useEffect(() => {
//     dispatch(
//       getListNotifications({
//         page: 1,
//         limit: 5,
//         receiverId:,
//         onSuccess: onLoadSuccess,
//         onFail: onLoadFail,
//       }),
//     );
//   }, []);

//   const onLoadSuccess = () => {
//     NavigationActionService.hideLoading();
//   };

//   const onLoadFail = (error?: ApiError) => {
//     NavigationActionService.hideLoading();
//     NavigationActionService.showPopup({
//       type: PopupType.ONE_BUTTON,
//       typeMessage: MessageType.ERROR,
//       title: 'Load thông báo thất bại',
//       message:
//         error?.message || 'Có một lỗi gì đó đã xảy ra, vui lòng thử lại sau',
//     });
//   };

  const goBack = () => {
    NavigationActionService.pop();
  };
  return {
    goBack,
    listNotificationRef,
    notifications,
  };
};

export default useNotification;
