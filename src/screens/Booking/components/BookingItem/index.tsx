import {View, Text, TouchableOpacity} from 'react-native';
import React, {createRef, useState} from 'react';
import styles from './style';
import {Booking} from '../../../../modules/booking/model';
import moment from 'moment';
import {changeDayInWeekToVI, formatStringDate} from '../../../../utils/date';
import {FormatCurrency} from '../../../../utils/currentcy';
import globalStyle from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Countdown from 'react-native-countdown-component';
import NavigationActionService from '../../../../navigation/navigation';
import {BOOKING_DETAIL_SCREEN} from '../../../../constants/screen_key';

type BookingItemProps = {
  booking: Booking;
};

const BookingItem = (props: BookingItemProps) => {
  const {booking} = props;

  const datetimeNow = new Date().getTime() / 1000;
  const getStatusText = () => {
    switch (booking.status) {
      case 'upcoming':
        return 'Sắp tới';
      case 'ongoing':
        return 'Đang thực hiện';
      case 'completed':
        return 'Đã hoàn thành';
      case 'canceled':
        return 'Đã hủy';
    }
  };
  const countdown =
    new Date(
      formatStringDate(booking.dateBooking) + ' ' + booking.timeBooking,
    ).getTime() / 1000;
  const goToDetail = () => {
    NavigationActionService.navigate(BOOKING_DETAIL_SCREEN, {booking: booking});
  };
  const countdownRef = createRef<Countdown>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={goToDetail}
      activeOpacity={0.6}>
      <View style={styles.headItem}>
        <Text style={styles.date}>Ngày {booking.dateBooking}</Text>
        <Text style={styles.price}>{FormatCurrency(booking.total)}</Text>
      </View>
      <Text style={[globalStyle.fontText, styles.time]}>
        {changeDayInWeekToVI(new Date(formatStringDate(booking.dateBooking)))},{' '}
        {booking.timeBooking}
      </Text>
      <View style={styles.addressContainer}>
        <Icon size={16} color="#d4d3d6" name="store" />
        <Text style={[globalStyle.fontText, styles.address]}>
          {booking.branch.address}
        </Text>
      </View>
      <View style={styles.confirmContainer}>
        <Text style={[globalStyle.fontText, {color: '#433443'}]}>
          {getStatusText()}
        </Text>
      </View>
      {booking.status != 'upcoming' ? null : countdown - datetimeNow <= 0 ? (
        <Text style={styles.textAfterTime}>
          Lịch đặt sẽ tự động hủy trong 24 tiếng tới
        </Text>
      ) : (
        <Countdown
          ref={countdownRef}
          until={countdown - datetimeNow}
          size={18}
          timeLabels={{d: 'ngày', h: 'giờ', m: 'phút', s: 'giây'}}
          timeLabelStyle={globalStyle.fontText}
          digitTxtStyle={styles.digitText}
        />
      )}
    </TouchableOpacity>
  );
};

export default BookingItem;
