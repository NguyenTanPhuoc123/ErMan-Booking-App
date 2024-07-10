import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
import {FormatCurrency} from '../../../../utils/currentcy';
import {
  CREATE_BOOKING_SCREEN,
  SERVICE_DETAIL_SCREEN,
} from '../../../../constants/screen_key';
import NavigationActionService from '../../../../navigation/navigation';
import {Service} from '../../../../modules/service/model';
import {formatBlogDuration} from '../../../../utils/date';
import {APP_TYPE} from '../../../../constants/app_info';

type ItemServiceRowProps = {
  item: Service;
  screenFrom: string;
  addService: (item: Service) => void;
  removeService: (item: Service) => void;
  listService?: Service[];
};

const ItemServiceRow = (props: ItemServiceRowProps) => {
  const {item, screenFrom, addService, removeService, listService} = props;
  const [status, setStatus] = useState(
    listService?.find(service => service.id === item.id) ? true : false,
  );
  const goToDetail = () => {
    NavigationActionService.navigate(SERVICE_DETAIL_SCREEN, {value: item});
  };
  const goToCreateBooking = () => {
    NavigationActionService.navigate(CREATE_BOOKING_SCREEN, {services: [item]});
  };

  const getContentBtn = () => {
    if (screenFrom === CREATE_BOOKING_SCREEN) {
      if (status) {
        return 'Đã thêm';
      }
      return 'Thêm dịch vụ';
    }
    return 'Đặt lịch ngay';
  };

  const onPressBtn = () => {
    if (screenFrom === CREATE_BOOKING_SCREEN) {
      setStatus(!status);
      if (status) {
        removeService(item);
      } else {
        addService(item);
      }
    } else {
      goToCreateBooking();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToDetail}>
      <FastImage
        source={{uri: item.image}}
        style={styles.img}
        resizeMode="cover"
      />
      <Text style={[globalStyle.fontText, styles.title]}>
        {item.serviceName}
      </Text>
      <Text style={[globalStyle.colorYellowBold, styles.price]}>
        {FormatCurrency(item.price)}
      </Text>
      <Text style={[globalStyle.fontText, styles.time]}>
        Thời gian: {formatBlogDuration(item.time)}
      </Text>
      {APP_TYPE != 'Customer' ? null : (
        <TouchableOpacity
          style={status ? styles.selectService : styles.bookNow}
          onPress={onPressBtn}>
          <Text style={[globalStyle.fontText, styles.contentBtn]}>
            {getContentBtn()}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ItemServiceRow;
