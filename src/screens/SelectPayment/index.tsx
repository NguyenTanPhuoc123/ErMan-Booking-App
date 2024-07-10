import {NativeModules, NativeEventEmitter} from 'react-native';
const { PayZaloBridge } = NativeModules;
const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const SelectPaymentScreen = () => {
 useEffect(()=>{
  const subscription = payZaloBridgeEmitter.addListener(
    'EventPayZalo',
    (data) => {
      if(data.returnCode == 1){
        console.log('Giao dịch thành công!');
      } else{
        console.log('Giao dịch thất bại!');
      }
    }
  );
})
    
  let payZP = NativeModules.PayZaloBridge;
  console.log(payZP);
  ;
  return (
    <View>
      <Text>SelectPaymentScreen</Text>
    </View>
  )
}

export default SelectPaymentScreen