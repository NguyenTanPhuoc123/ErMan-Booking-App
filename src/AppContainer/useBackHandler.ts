import {useEffect, useState} from 'react';
import {BackHandler, Platform, ToastAndroid} from 'react-native';
import {navigationRef} from '../navigation/navigation';

const useBackHandler = () => {
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isExit) {
        setIsExit(false);
      }
    }, 1000);

    const backAction = () => {
      if (navigationRef.getState().index == 0 && Platform.OS==='android') {
        if (isExit) {
          BackHandler.exitApp();
          return true;
        }
        ToastAndroid.showWithGravity(
          'Nhấn lần nữa để thoát ',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        setIsExit(true);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      clearTimeout(timer);
      backHandler.remove();
    };
  });
};

export default useBackHandler;
