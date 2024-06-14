import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

type ItemStylistRowProps = {
  image: number;
  fullname: string;
  rate: number;
  address: string;
};

const ItemStylistRow = (props: ItemStylistRowProps) => {
  const {image, fullname, rate, address} = props;

  return (
    <TouchableOpacity style={styles.container}>
      <FastImage source={image} style={styles.img} resizeMode="cover" />
      <Text style={[globalStyle.fontText, styles.title]}>{fullname}</Text>
      <Text style={[globalStyle.fontText, styles.address]}>{address}</Text>
      <View style={styles.rate}>
        {new Array(rate).fill(0).map((_, index) => (
          <Icon key={index} name="star" color="#F3CC67" solid size={9} />
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default ItemStylistRow;
