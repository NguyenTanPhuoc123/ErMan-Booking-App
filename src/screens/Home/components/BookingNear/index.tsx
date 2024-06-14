import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../../../constants/styles';
import FastImage from 'react-native-fast-image';
import {CUSTOMER} from '../../../../constants/icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FormatCurrency } from '../../../../utils/currentcy';
type BookingNearProps = {
  avatar?: number;
  fullname?: string;
  total?: number;
  time?: number;
  service?: string;
};
const BookingNear = (props: BookingNearProps) => {
  const renderEmpty = () => (
    <View style={styles.containerEmpty}>
      <Icon name="sad-tear" style={globalStyle.fontText} solid size={60} />
      <Text style={[globalStyle.fontText, styles.titleEmpty]}>
        Chưa có lịch đặt hôm nay
      </Text>
    </View>
  );
  const renderContent = () => (
    <>
      <FastImage
        style={styles.avatarCustomer}
        source={props?.avatar}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={[styles.name, globalStyle.fontText]}>{props?.fullname}</Text>
        <Text style={[globalStyle.fontText, styles.otherInfo]}>
          Dịch vụ: {props?.service}
        </Text>
        <Text style={[globalStyle.fontText, styles.otherInfo]}>
          Tổng tiền: {FormatCurrency(props?.total || 0)}
        </Text>
        <Text style={[globalStyle.fontText, styles.otherInfo]}>
          Giờ đặt: {props?.time}
        </Text>
        <TouchableOpacity style={styles.viewDetail}>
          <Text style={[globalStyle.fontText, styles.txtViewDetail]}>
            Xem chi tiết
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
  return props===undefined ? (
    <View style={styles.container}>{renderContent()}</View>
  ) : (
    renderEmpty()
  );
};

export default BookingNear;
