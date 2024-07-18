import {View, Text} from 'react-native';
import React from 'react';
import {Booking} from '../../../../modules/booking/model';
import styles from './style';
import globalStyle from '../../../../constants/styles';

const BookingItem = (props: Booking) => {
  const {staff, status} = props;
  const getStatusText = () => {
    switch (status) {
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
  return (
    <View style={styles.container}>
      <Text style={[globalStyle.fontText, styles.staffName]}>
        {staff.firstname + '' + staff.lastname}
      </Text>
      <Text style={[globalStyle.fontText, styles.staffName]}>
        Trạng thái: {getStatusText()}{' '}
      </Text>
    </View>
  );
};

export default BookingItem;
