import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import useServiceDetail from './useServiceDetail';
import globalStyle from '../../constants/styles';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import NavigationActionService from '../../navigation/navigation';
import FastImage from 'react-native-fast-image';
import {FormatCurrency} from '../../utils/currentcy';
import {APP_TYPE} from '../../constants/app_info';
import {formatBlogDuration} from '../../utils/date';
import {SERVICE_CUT_HAIR} from '../../constants/icons';

const ServiceDetailScreen = () => {
  const {value, goToCreateBooking, goBack} = useServiceDetail();

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={[globalStyle.fontText, styles.titleHeader]}>
            Thông tin dịch vụ
          </Text>
        }
        leftComponent={
          <TouchableOpacity onPress={goBack}>
            <Icon
              name="arrow-left"
              size={25}
              style={globalStyle.fontText}
              solid
            />
          </TouchableOpacity>
        }
      />
    );
  };

  const renderDescription = () => (
    <View style={styles.containerDescription}>
      <Text style={styles.titleDescription}>Mô tả</Text>
      <View style={styles.displayDescription}>
        <ScrollView>
          <Text style={[globalStyle.fontText, styles.description]}>
            {'    '}
            {value.description || 'Không có mô tả'}
          </Text>
        </ScrollView>
      </View>
      {APP_TYPE === 'Customer' ? (
        <TouchableOpacity
          style={styles.btnBookingNow}
          onPress={goToCreateBooking}>
          <Text style={styles.contentBtn}>Đặt lịch ngay</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <FastImage
        source={!value.image ? SERVICE_CUT_HAIR : {uri: value.image}}
        style={styles.img}
        resizeMode="cover"
      />
      <Text style={[globalStyle.fontText, styles.serviceName]}>
        {value.serviceName}
      </Text>
      <Text style={[globalStyle.fontText, styles.time]}>
        Thời gian thực hiện: {formatBlogDuration(value.time)}
      </Text>
      <Text style={[globalStyle.fontText, styles.price]}>
        Giá: {FormatCurrency(value.price)}
      </Text>
      {renderDescription()}
    </View>
  );
};

export default ServiceDetailScreen;
