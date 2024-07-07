import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';
import styles from './style';
import useBookingDetail from './useBookingDetail';
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle from '../../constants/styles';
import {formatBlogDuration} from '../../utils/date';
import {FormatCurrency} from '../../utils/currentcy';
import CountDown from 'react-native-countdown-component';

const BookingDetailScreen = () => {
  const {
    booking,
    goBack,
    getStatusText,
    getTotalTime,
    datetimeNow,
    countdown,
    countdownRef,
    goToEditBooking,
  } = useBookingDetail();

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

  const rowInfo = (label: string, component: JSX.Element) => {
    return (
      <View style={styles.rowInfo}>
        <Text style={styles.textInfo}>{label}</Text>
        {component}
      </View>
    );
  };

  const tableService = () => {
    return (
      <View style={styles.service}>
        <View style={styles.rowTable}>
          <Text style={[styles.textInfo, globalStyle.fontBold]}>Dịch vụ</Text>
          <Text style={[styles.textInfo, globalStyle.fontBold]}>Giá</Text>
        </View>
        {booking.booking.services.map((service: any) => {
          return (
            <View key={service.Service.id} style={styles.rowTable}>
              <Text style={styles.textInfo}>{service.Service.serviceName}</Text>
              <Text style={styles.textInfo}>
                {FormatCurrency(service.Service.price)}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderBookingInfo = () => (
    <View style={styles.bookingInfo}>
      <Text style={styles.titleBody}>1. Thông tin lịch đặt</Text>
      {rowInfo(
        'Trạng thái:',
        <Text style={styles.textStatus}>{getStatusText()}</Text>,
      )}
      {rowInfo(
        'Thời gian đặt:',
        <Text style={styles.textInfo}>
          Ngày {booking.booking.datetimeBooking}
        </Text>,
      )}
      {rowInfo(
        'Tổng thời gian:',
        <Text style={styles.textInfo}>
          {formatBlogDuration(getTotalTime())}
        </Text>,
      )}
      {rowInfo(
        'Nhân viên thực hiện:',
        <Text style={styles.textInfo}>
          {booking.booking.staff.firstname +
            ' ' +
            booking.booking.staff.lastname}
        </Text>,
      )}
      {tableService()}
    </View>
  );

  const renderPayment = () => (
    <View style={styles.bookingInfo}>
      <Text style={styles.titleBody}>2. Thông tin thanh toán</Text>
      {rowInfo(
        'Phương thức thanh toán:',
        <Text style={styles.textInfo}>Tiền mặt</Text>,
      )}
      {rowInfo(
        'Tổng tiền:',
        <Text style={styles.textInfo}>
          {FormatCurrency(booking.booking.total)}
        </Text>,
      )}
      {rowInfo(
        'Trạng thái thanh toán:',
        <Text style={styles.textInfo}>
          {booking.booking.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </Text>,
      )}
    </View>
  );
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {booking.booking.status === 'completed' ||
        booking.booking.status === 'upcoming' ? (
          <TouchableOpacity style={styles.buttonEdit} onPress={goToEditBooking}>
            <Text style={styles.contentBtn}>
              {booking.booking.status === 'completed'
                ? 'Nhận xét đánh giá'
                : 'Chỉnh sửa'}
            </Text>
          </TouchableOpacity>
        ) : null}
        {booking.booking.status != 'upcoming' ? null : (
          <TouchableOpacity style={styles.buttonCancel}>
            <Text style={styles.contentBtn}>Hủy</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <ScrollView>
        {renderBookingInfo()}
        {renderPayment()}
        {booking.booking.status != 'upcoming' ? null : countdown -
            datetimeNow <=
          0 ? (
          <Text style={styles.textAfterTime}>
            Lịch đặt sẽ tự động hủy trong 24 tiếng tới
          </Text>
        ) : (
          <CountDown
            ref={countdownRef}
            until={countdown - datetimeNow}
            size={18}
            timeLabels={{d: 'ngày', h: 'giờ', m: 'phút', s: 'giây'}}
            timeLabelStyle={globalStyle.fontText}
            digitTxtStyle={styles.digitText}
          />
        )}
      </ScrollView>
      {renderFooter()}
    </View>
  );
};

export default BookingDetailScreen;
