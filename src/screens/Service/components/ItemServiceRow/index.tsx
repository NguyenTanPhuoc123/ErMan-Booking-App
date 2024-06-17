import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
import { FormatCurrency } from '../../../../utils/currentcy';
import { SERVICE_DETAIL_SCREEN } from '../../../../constants/screen_key';
import NavigationActionService from '../../../../navigation/navigation';
type ItemServiceRowProps = {
  image: number;
  serviceName: string;
  price: number;
};

const ItemServiceRow = (props: ItemServiceRowProps) => {
  const {image, serviceName, price} = props;
  const goToDetail = ()=>{
    NavigationActionService.navigate(SERVICE_DETAIL_SCREEN,{value:props});
  }
  return (
    <TouchableOpacity style={styles.container} onPress={goToDetail}>
      <FastImage source={image} style={styles.img} />
      <Text style={[globalStyle.fontText, styles.title]}>{serviceName}</Text>
      <Text style={[globalStyle.colorYellowBold, styles.price]}>
        {FormatCurrency(price)}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemServiceRow;
