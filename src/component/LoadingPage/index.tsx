import {View, ActivityIndicator} from 'react-native';
import React, {
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import styles from './style';
import {LoadingPageRef} from './type';

const LoadingPage = forwardRef((props: any, ref: Ref<LoadingPageRef>) => {
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    isLoading() {
      return isShowLoading;
    },
    showLoading() {
      setIsShowLoading(true);
    },
    hideLoading() {
      setIsShowLoading(false);
    },
  }));
  const renderLoading = useMemo(() => {
    return !isShowLoading ? (
      <></>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }, [isShowLoading]);
  return renderLoading;
});

export default LoadingPage;
