import { MessageType, PopupType } from '../../component/CustomPopup/type';
import NavigationActionService from '../../navigation/navigation';
import { NativeModules, NativeEventEmitter } from 'react-native';

const useSelectPayment = () => {
 
  const goBack = () => {
    NavigationActionService.pop();
  };
  return {goBack};
};

export default useSelectPayment;
