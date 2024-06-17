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
const ServiceDetailScreen = () => {
  const {value} = useServiceDetail();

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={[globalStyle.fontText, styles.titleHeader]}>
            Chi tiết dịch vụ
          </Text>
        }
        leftComponent={
          <TouchableOpacity onPress={() => NavigationActionService.pop()}>
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
      <View>
        <ScrollView>
          <Text style={[globalStyle.fontText, styles.description]}>
            {'  '}Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.btnBookingNow}>
        <Text style={styles.contentBtn}>Đặt lịch ngay</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <FastImage source={value.image} style={styles.img} resizeMode="cover" />
      <Text style={[globalStyle.fontText, styles.serviceName]}>
        {value.serviceName}
      </Text>
      <Text style={[globalStyle.fontText, styles.price]}>
        Giá: {FormatCurrency(value.price)}
      </Text>
      {renderDescription()}
    </View>
  );
};

export default ServiceDetailScreen;
