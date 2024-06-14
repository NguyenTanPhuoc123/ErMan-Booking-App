import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
import { FormatCurrency } from '../../../../utils/currentcy';
type ItemServiceRowProps = {
  image: number;
  serviceName: string;
  price: number;
};

const ItemServiceRow = (props: ItemServiceRowProps) => {
  const {image, serviceName, price} = props;
  return (
    <TouchableOpacity style={styles.container}>
      <FastImage source={image} style={styles.img} />
      <Text style={[globalStyle.fontText, styles.title]}>{serviceName}</Text>
      <Text style={[globalStyle.colorYellowBold, styles.price]}>
        {FormatCurrency(price)}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemServiceRow;
