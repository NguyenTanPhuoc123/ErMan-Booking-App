import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import {Service} from '../../../../../modules/service/model';
import NavigationActionService from '../../../../../navigation/navigation';
import {SERVICE_DETAIL_SCREEN} from '../../../../../constants/screen_key';
import globalStyle from '../../../../../constants/styles';
import {FormatCurrency} from '../../../../../utils/currentcy';
import {formatBlogDuration} from '../../../../../utils/date';

const ItemServiceRow = (props: Service) => {
  const {image, serviceName, price, time} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <FastImage source={{uri: image}} style={styles.img} resizeMode="cover" />
      <Text style={[globalStyle.fontText, styles.title]}>{serviceName}</Text>
      <Text style={[globalStyle.colorYellowBold, styles.price]}>
        {FormatCurrency(price)}
      </Text>
      <Text style={[globalStyle.fontText, styles.time]}>
        Thời gian: {formatBlogDuration(time)}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemServiceRow;
