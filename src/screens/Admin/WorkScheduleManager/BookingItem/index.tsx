import {View, Text} from 'react-native';
import React from 'react';
import {Booking} from '../../../../modules/booking/model';
import styles from './style';
import globalStyle from '../../../../constants/styles';
import {Staff} from '../../../../modules/user/model';

const BookingItem = (props: Staff) => {
  const {firstname, lastname} = props;

  return (
    <View style={styles.container}>
      <Text style={[globalStyle.fontText, styles.staffName]}>
        {firstname + ' ' + lastname}
      </Text>
      <Text style={[globalStyle.fontText, styles.staffName]}>
        Trạng thái: 
      </Text>
    </View>
  );
};

export default BookingItem;
