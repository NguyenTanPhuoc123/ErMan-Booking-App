import {useDispatch, useSelector} from 'react-redux';
import {MessageType, PopupType} from '../../component/CustomPopup/type';
import NavigationActionService from '../../navigation/navigation';
import {logout} from '../../modules/auth';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../../modules/auth/model';
import {CHANGE_PASSWORD_SCREEN, NOTIFICATION_SCREEN} from '../../constants/screen_key';

const usePersonal = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector<RootState, IAuthState>(
    state => state.auth,
  ).userData;

  const showLogout = () => {
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Đăng xuất',
      message: 'Bạn chắc chắc muốn đăng xuất?',
      onPressPrimaryBtn: () => {
        dispatch(
          logout({
            onSuccess: () => {},
            onFail: () =>
              NavigationActionService.showPopup({
                type: PopupType.ONE_BUTTON,
                typeMessage: MessageType.ERROR,
                title: 'Đăng xuất',
                message: 'Có một lỗi gì đó đã xảy ra!',
              }),
          }),
        );
      },
    });
  };

  const goToNotifcation = () => {
    NavigationActionService.navigate(NOTIFICATION_SCREEN);
  };


  const showAppInfo = (children:JSX.Element)=>{
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Thông tin ứng dụng',
      children:children
    })
  }
  return {
    currentUser,
    showLogout,
    goToNotifcation,
    showAppInfo,
  };
};

export default usePersonal;
