import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';
import styles from './style';
import useBookingDetail from './useBookingDetail';
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle from '../../constants/styles';

const BookingDetailScreen = () => {
  const {booking, goBack} = useBookingDetail();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        leftComponent={
          <TouchableOpacity onPress={goBack}>
            <Icon name="arrow-left" size={25} color="#d4d3d6" solid />
          </TouchableOpacity>
        }
        centerComponent={
          <Text style={styles.titleHeader}>Lịch đặt của tôi</Text>
        }
      />
    );
  };
  const renderBookingInfo = () => (
    <View style={styles.bookingInfo}>
      <Text style={styles.titleBody}>Thông tin lịch đặt</Text>
      <Text>Trạng thái: {booking.status}</Text>
    </View>
  );
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      {renderBookingInfo()}
    </View>
  );
};

export default BookingDetailScreen;
