import {View, Text} from 'react-native';
import React, {Ref, useImperativeHandle, useState} from 'react';
import styles from './style';
import Skeleton from 'react-native-reanimated-skeleton';
import globalStyle from '../../constants/styles';
import {SkeletonLoadingRef} from './type';

type SkeletonProps = {
  status: boolean;
};
const CustomSketelonService = (props: SkeletonProps) => {
  const {status} = props;
  // const [loading,setLoading] = useState(false);
  // useImperativeHandle(ref, () => ({
  //   isLoading() {
  //     return loading;
  //   },
  //   showLoading() {
  //     setLoading(true);
  //   },
  //   hideLoading() {
  //     setLoading(false);
  //   },
  // }));
  return (
    <Skeleton
      containerStyle={styles.container}
      isLoading={status}
      boneColor="#282828"
      layout={[
        {
          width: '100%',
          height: 100,
          borderRadius: 20,
          backgroundColor: '#4B4A47',
        },
        {
          width: '60%',
          height: 20,
          borderRadius: 5,
          margin: 3,
          alignSelf: 'center',
          backgroundColor: '#4B4A47',
        },
        {
          width: '80%',
          height: 20,
          borderRadius: 5,
          marginHorizontal: 10,
          backgroundColor: '#4B4A47',
        },
        {
          width: '80%',
          height: 20,
          borderRadius: 5,
          marginHorizontal: 10,
          marginTop: 3,
          backgroundColor: '#4B4A47',
        },
        {
          width: '80%',
          height: 20,
          padding: 7,
          borderRadius: 5,
          alignSelf: 'center',
          margin: 10,
          backgroundColor: '#4B4A47',
        },
      ]}
    />
  );
};

export default CustomSketelonService;
