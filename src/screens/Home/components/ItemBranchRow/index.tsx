import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {formatDistance} from '../../../../utils/distance';

type ItemBranchRowProps = {
  image: number;
  branchName: string;
  rate: number;
  status: boolean;
  address: string;
  distance: number;
};

const ItemBranchRow = (props: ItemBranchRowProps) => {
  const {image, branchName, rate, status, address, distance} = props;
  return (
    <TouchableOpacity style={styles.container}>
      <FastImage source={image} style={styles.img} />
      <Text
        style={[
          globalStyle.fontText,
          styles.status,
          status ? globalStyle.colorStatusOpen : globalStyle.colorStatusClose,
        ]}>
        {status ? 'Đang mở' : 'Đã đóng'}
      </Text>
      <Text style={[globalStyle.fontText, styles.title]}>{branchName}</Text>
      <Text style={[globalStyle.fontText, styles.address]}>{address}</Text>
      <View style={styles.bottomItem}>
        <View style={styles.rate}>
          {new Array(rate).fill(0).map((_, index) => (
            <Icon key={index} name="star" color="#F3CC67" solid size={9} />
          ))}
        </View>
        <View style={styles.distance}>
          <Icon name="map-marker-alt" size={9} solid color="#D4D3D6" />
          <Text style={[globalStyle.fontText, styles.textDistance]}>
            {' '}
            {formatDistance(distance)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemBranchRow;
