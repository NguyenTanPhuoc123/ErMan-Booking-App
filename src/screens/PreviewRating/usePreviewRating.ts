import {useDispatch, useSelector} from 'react-redux';
import NavigationActionService from '../../navigation/navigation';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {MessageType, PopupType} from '../../component/CustomPopup/type';
import {createRating} from '../../modules/rate';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../../modules/auth/model';
import {ApiError} from '../../constants/api';
import {Rating} from '../../modules/rate/model';

const usePreviewRating = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const {booking} = route.params as any;
  const rate: Rating = (route.params as any).rating;
  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const goBack = () => {
    NavigationActionService.pop();
  };

  useEffect(() => {
    if (rate) {
      setRated(true);
    }
  }, []);

  const onSuccess = () => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Đánh giá',
      message: 'Đánh giá thành công',
    });
    NavigationActionService.popToRoot();
  };

  const onFail = (error?: ApiError) => {
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Đánh giá thất bại',
      message: error?.message || 'Có một lỗi gì đó đã xảy ra',
    });
  };

  const ratingBooking = () => {
    dispatch(
      createRating({
        rate: rating,
        bookingId: booking.id,
        review: review,
        reviewer: userData,
        onSuccess: onSuccess,
        onFail: onFail,
      }),
    );
  };

  const confirmRating = () => {
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Xác nhận đánh giá',
      message:
        'Sau khi đánh giá thì bạn không thể sửa lại được, bạn chắc chắn muốn đánh giá chứ?',
      onPressPrimaryBtn: ratingBooking,
    });
  };
  return {
    goBack,
    rating,
    setRating,
    review,
    setReview,
    booking,
    confirmRating,
    rated,
    rate
  };
};

export default usePreviewRating;
