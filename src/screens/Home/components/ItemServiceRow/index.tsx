import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
import {FormatCurrency} from '../../../../utils/currentcy';
import NavigationActionService from '../../../../navigation/navigation';
import {
  CREATE_BOOKING_SCREEN,
  SERVICE_DETAIL_SCREEN,
} from '../../../../constants/screen_key';
import {Service} from '../../../../modules/service/model';
import {formatBlogDuration} from '../../../../utils/date';
import {APP_TYPE} from '../../../../constants/app_info';

const ItemServiceRow = (props: Service) => {
  const {image, serviceName, price, time, discount} = props;
  const goToDetail = () => {
    NavigationActionService.navigate(SERVICE_DETAIL_SCREEN, {value: props});
  };
  const goToCreateBooking = () => {
    NavigationActionService.navigate(CREATE_BOOKING_SCREEN, {
      services: [props],
    });
  };
  const renderDiscount = () => (
    <View style={styles.discount}>
      <Text style={styles.textDiscount}>Giảm {discount}%</Text>
    </View>
  );
  return (
    <TouchableOpacity style={styles.container} onPress={goToDetail}>
      <FastImage source={{uri: image}} style={styles.img} resizeMode="cover" />
      {discount > 0 ? renderDiscount() : null}
      <Text style={[globalStyle.fontText, styles.title]}>{serviceName}</Text>
      <Text style={[globalStyle.colorYellowBold, styles.price]}>
        {FormatCurrency(price)}
      </Text>
      <Text style={[globalStyle.fontText, styles.time]}>
        Thời gian: {formatBlogDuration(time)}
      </Text>
      {APP_TYPE != 'Customer' ? null : (
        <TouchableOpacity style={styles.bookNow} onPress={goToCreateBooking}>
          <Text style={[globalStyle.fontText, styles.contentBtn]}>
            Đặt lịch ngay
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ItemServiceRow;
