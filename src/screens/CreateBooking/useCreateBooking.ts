import {useDispatch, useSelector} from 'react-redux';
import NavigationActionService from '../../navigation/navigation';
import {useRoute} from '@react-navigation/native';
import {RootState} from '../../redux/reducers';
import {IUserState, Staff} from '../../modules/user/model';
import {useEffect, useState} from 'react';
import {getListStaff} from '../../modules/user';
import moment from 'moment';
import { MessageType, PopupType } from '../../component/CustomPopup/type';
import { ApiError } from '../../constants/api';
import { createNewBooking } from '../../modules/booking';
import { IAuthState } from '../../modules/auth/model';

const useCreateBooking = () => {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const stylists = useSelector<RootState, IUserState>(
    state => state.user,
  ).users.filter(user => user.typeAccount === 'Staff');
  const {userData} = useSelector<RootState,IAuthState>(state=>state.auth);
  const services = (params as any).services || [];
  const branch = (params as any).branch || null;
  const [stylist, setStylist] = useState<Staff>();
  const dateNow = moment(new Date()).format('DD-MM-YYYY');
  const timeNow = moment(new Date()).format('HH:MM');
  const [date, setDate] = useState(dateNow);
  const [time, setTime] = useState(timeNow);

  useEffect(() => {
    dispatch(
      getListStaff({
        limit: 100,
        page: 1,
        onSuccess: () => {},
        onFail: () => {},
      }),
    );
  }, []);

  const onCreateSuccess = ()=>{
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type:PopupType.ONE_BUTTON,
      typeMessage:MessageType.COMMON,
      title:'Đặt lịch',
      message:'Đặt lịch thành công',
    })
  }

  const onCreateFail = (error?:ApiError)=>{
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type:PopupType.ONE_BUTTON,
      typeMessage:MessageType.ERROR,
      title:'Đặt lịch thất bại',
      message:error?.message || 'Có lỗi gì đó đã xảy ra',
    })
  }

  const createBooking = () => {
    NavigationActionService.showLoading();
    dispatch(createNewBooking({
      onSuccess:onCreateSuccess,
      onFail:onCreateFail,
      body:{
        branch:branch,
        services:services,
        customer: userData,
        staff: stylist || stylists[0] as Staff,
        isPaid:false,
        datetimeBooking:`${date} ${time} `,
      }
    }))
  };

  const goBack = () => {
    NavigationActionService.popToRoot();
  };
  return {
    goBack,
    services,
    branch,
    stylists,
    stylist,
    setStylist,
    date,
    setDate,
    time,
    setTime,
    createBooking,
  };
};

export default useCreateBooking;
