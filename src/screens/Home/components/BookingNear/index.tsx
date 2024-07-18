import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../../../constants/styles';
import FastImage from 'react-native-fast-image';
import {AVARTAR_DEFAULT_CUSTOMER} from '../../../../constants/icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FormatCurrency} from '../../../../utils/currentcy';
import {Booking} from '../../../../modules/booking/model';
import NavigationActionService from '../../../../navigation/navigation';
import {BOOKING_DETAIL_SCREEN} from '../../../../constants/screen_key';
type BookingNearProps = {
  booking: Booking | null;
};
const BookingNear = (props: BookingNearProps) => {
  const {booking} = props;

  const goToDetail = () => {
    NavigationActionService.navigate(BOOKING_DETAIL_SCREEN, {booking: booking});
  };
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
        source={
          !booking?.customer.avatar
            ? AVARTAR_DEFAULT_CUSTOMER
            : {uri: booking.customer.avatar}
        }
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={[styles.name, globalStyle.fontText]}>
          {booking?.customer.firstname + ' ' + booking?.customer.lastname}
        </Text>
        <Text style={[globalStyle.fontText, styles.otherInfo]}>
          Dịch vụ:{' '}
          {booking?.services.map(service => service.serviceName + ', ')}
        </Text>
        <Text style={[globalStyle.fontText, styles.otherInfo]}>
          Tổng tiền: {FormatCurrency(booking?.total || 0)}
        </Text>
        <Text style={[globalStyle.fontText, styles.otherInfo]}>
          Giờ đặt: {booking?.dateBooking + ' '+booking?.timeBooking}
        </Text>
        <TouchableOpacity style={styles.viewDetail} onPress={goToDetail}>
          <Text style={[globalStyle.fontText, styles.txtViewDetail]}>
            Xem chi tiết
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
  return booking != null ? (
    <View style={styles.container}>{renderContent()}</View>
  ) : (
    renderEmpty()
  );
};

export default BookingNear;
