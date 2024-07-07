import {useRoute} from '@react-navigation/native';
import NavigationActionService from '../../navigation/navigation';
import {CREATE_BOOKING_SCREEN} from '../../constants/screen_key';

const useServiceDetail = () => {
  const route = useRoute();
  const {value} = route.params as any;
  const goToCreateBooking = () => {
    NavigationActionService.navigate(CREATE_BOOKING_SCREEN, {
      services: [value],
    });
  };
  const goBack = () => {
    NavigationActionService.pop();
  };
  return {
    value,
    goToCreateBooking,
    goBack,
  };
};

export default useServiceDetail;
