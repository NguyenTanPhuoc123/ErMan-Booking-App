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
import {APP_TYPE} from '../../constants/app_info';
import FastImage, {Source} from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import {nanoid} from '@reduxjs/toolkit';

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
    showPopupConfirm,
    showPopupConfirmComplete,
    showPopupConfirmCancel,
    goToRatingPreview,
    rating,
    listImg,
    visible,
    setVisible,
    idx,
    uploadImages,
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
        {booking.services.map((service: any) => {
          return (
            <View key={service.id} style={styles.rowTable}>
              <Text style={styles.textInfo}>{service.serviceName}</Text>
              <Text style={styles.textInfo}>
                {FormatCurrency(service.price)}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderImage = () => {
    return (
      <View style={styles.containerImg}>
        {!listImg
          ? null
          : listImg.map((img, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    idx.current = index;
                    setVisible(true);
                  }}>
                  <FastImage
                    key={nanoid(3)}
                    source={img as Source}
                    resizeMode="cover"
                    style={styles.img}
                  />
                </TouchableOpacity>
              );
            })}
        {booking.status === 'ongoing' && APP_TYPE === 'Staff'
          ? renderUploadImg()
          : null}
      </View>
    );
  };

  const renderUploadImg = () => {
    return (
      <TouchableOpacity
        style={[styles.img, styles.addImages]}
        onPress={uploadImages}
        activeOpacity={0.7}>
        <Icon name="plus" color="#344334" size={24} />
      </TouchableOpacity>
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
          Ngày {booking.dateBooking + ' ' + booking.timeBooking}
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
          {booking.staff.firstname + ' ' + booking.staff.lastname}
        </Text>,
      )}
      {rowInfo(
        'Khách hàng:',
        <Text style={styles.textInfo}>
          {booking.customer.firstname + ' ' + booking.customer.lastname}
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
        <Text style={styles.textInfo}>{booking.payment.name}</Text>,
      )}
      {rowInfo(
        'Tổng tiền:',
        <Text style={styles.textInfo}>{FormatCurrency(booking.total)}</Text>,
      )}
      {rowInfo(
        'Trạng thái thanh toán:',
        <Text style={styles.textInfo}>
          {booking.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </Text>,
      )}
    </View>
  );
  const renderFooter = () => {
    return APP_TYPE === 'Customer' ? (
      <View style={styles.footer}>
        {booking.status === 'completed' || booking.status === 'upcoming' ? (
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={
              booking.status === 'completed'
                ? goToRatingPreview
                : goToEditBooking
            }>
            <Text style={styles.contentBtn}>
              {booking.status === 'completed'
                ? rating
                  ? 'Xem nhận xét đánh giá'
                  : 'Nhận xét đánh giá'
                : 'Chỉnh sửa'}
            </Text>
          </TouchableOpacity>
        ) : null}
        {booking.status != 'upcoming' ? null : (
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={showPopupConfirmCancel}>
            <Text style={styles.contentBtn}>Hủy</Text>
          </TouchableOpacity>
        )}
      </View>
    ) : (
      <View style={styles.footer}>
        {booking.status === 'upcoming' ? (
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={showPopupConfirm}>
            <Text style={styles.contentBtn}>Bắt đầu ngay</Text>
          </TouchableOpacity>
        ) : booking.status === 'ongoing' ? (
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={showPopupConfirmComplete}>
            <Text style={styles.contentBtn}>Hoàn thành</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <ScrollView>
        {renderBookingInfo()}
        {renderPayment()}
        {booking.status != 'upcoming' ? null : countdown - datetimeNow <= 0 ? (
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
        {booking.status === 'completed' || booking.status === 'ongoing'
          ? renderImage()
          : null}
      </ScrollView>
      {renderFooter()}
      <ImageView
        visible={visible}
        keyExtractor={() => nanoid(4)}
        animationType="slide"
        backgroundColor="#282828"
        images={listImg}
        imageIndex={idx.current}
        onImageIndexChange={index => (idx.current = index)}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

export default BookingDetailScreen;
