import { MessageType, PopupType } from '../../component/CustomPopup/type';
import NavigationActionService from '../../navigation/navigation';
import { NativeModules, NativeEventEmitter } from 'react-native';

const useSelectPayment = () => {
  const {PayZaloBridge} = NativeModules;
  const payZaloBridgeEmmiter = new NativeEventEmitter(PayZaloBridge);
  const subscription = payZaloBridgeEmmiter.addListener('EventPayZalo',(data)=>{
    console.log("Kết quả giao dịch: ",data.returnCode);
    if(data.returnCode===-1){
      const payZP = NativeModules.PayZaloBridge;
      payZP.installApp(); 
    }
    else if(data.returnCode===1){
      NavigationActionService.showPopup({
        type:PopupType.ONE_BUTTON,
        typeMessage:MessageType.COMMON,
        title:"Thanh toán ",
        message:"Thanh toán thành công",
      })
    }
    else {
      NavigationActionService.showPopup({
        type:PopupType.ONE_BUTTON,
        typeMessage:MessageType.ERROR,
        title:"Thanh toán ",
        message:"Thanh toán thất bại",
      })
    }
    
  })
  const goBack = () => {
    NavigationActionService.pop();
  };
  return {goBack,subscription};
};

export default useSelectPayment;
