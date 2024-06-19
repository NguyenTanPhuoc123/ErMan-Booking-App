import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
import { FormatCurrency } from '../../../../utils/currentcy';
import NavigationActionService from '../../../../navigation/navigation';
import { SERVICE_DETAIL_SCREEN } from '../../../../constants/screen_key';
import { Service } from '../../../../modules/service/model';


const ItemServiceRow = (props: Service) => {
  const {image, serviceName, price} = props;
  const goToDetail = ()=>{
    NavigationActionService.navigate(SERVICE_DETAIL_SCREEN,{value:props});
  }
  return (
    <TouchableOpacity style={styles.container} onPress={goToDetail}>
      <FastImage source={{uri:image}} style={styles.img} resizeMode='cover' />
      <Text style={[globalStyle.fontText, styles.title]}>{serviceName}</Text>
      <Text style={[globalStyle.colorYellowBold, styles.price]}>
        {FormatCurrency(price)}
      </Text>
      <TouchableOpacity style={styles.bookNow} onPress={goToDetail}>
        <Text style={[globalStyle.fontText,styles.contentBtn]}>Đặt lịch ngay</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItemServiceRow;
