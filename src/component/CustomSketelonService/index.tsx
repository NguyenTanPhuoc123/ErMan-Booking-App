import {FlatList} from 'react-native';
import React, {Ref, forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import styles from './style';
import Skeleton from 'react-native-reanimated-skeleton';
import {colorSkeletonItem} from '../../constants/styles';
import {SkeletonLoadingRef} from './type';

const CustomSketelonService = forwardRef((props: any, ref: Ref<SkeletonLoadingRef>) => {
  const [loading, setLoading] = useState(false);
  console.log(loading);
  
  useImperativeHandle(ref, () => ({
    isSkeletonLoading() {
      return loading;
    },
    showSkeletonLoading() {
      console.log('Show');
      setLoading(true);
    },
    hideSkeletonLoading() {
      console.log('Hide');
      setLoading(false);
    },
  }));
  const renderSketelon =  useMemo(
    () => (
      <FlatList
        data={Array(4).fill(null)}
        numColumns={2}
        renderItem={({index}) => (
          <Skeleton
            key={index}
            containerStyle={styles.container}
            isLoading={loading}
            layout={[
              {
                width: '100%',
                height: 100,
                borderRadius: 20,
                backgroundColor: colorSkeletonItem,
              },
              {
                width: '60%',
                height: 20,
                borderRadius: 5,
                margin: 3,
                alignSelf: 'center',
                backgroundColor: colorSkeletonItem,
              },
              {
                width: '80%',
                height: 20,
                borderRadius: 5,
                marginHorizontal: 10,
                backgroundColor: colorSkeletonItem,
              },
              {
                width: '80%',
                height: 20,
                borderRadius: 5,
                marginHorizontal: 10,
                marginTop: 3,
                backgroundColor: colorSkeletonItem,
              },
              {
                width: '80%',
                height: 20,
                padding: 7,
                borderRadius: 5,
                alignSelf: 'center',
                margin: 10,
                backgroundColor: colorSkeletonItem,
              },
            ]}
          />
        )}
      />
    ),
    [loading],
  );
  return renderSketelon;
});

export default CustomSketelonService;
