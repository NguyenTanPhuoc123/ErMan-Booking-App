import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';
import styles from './style';
import globalStyle from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useCreateBooking from './useCreateBooking';
import SelectService from './components/SelectService';
import SelectBranch from './components/SelectBranch';
import SelectStylistAndTime from './components/SelectStylistAndTime';
import {Staff} from '../../modules/user/model';

const CreateBookingScreen = () => {
  const {
    goBack,
    services,
    branch,
    stylists,
    stylist,
    setStylist,
    date,
    setDate,
    time,
    setTime,
    createBooking,
  } = useCreateBooking();

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={[globalStyle.fontText, styles.titleHeader]}>
            Đặt lịch giữ chỗ
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

  const renderButtonBooking = () => (
    <TouchableOpacity style={styles.btnBooking} onPress={createBooking}>
      <Text style={styles.contentBtnBooking}>Chốt giờ đặt</Text>
    </TouchableOpacity>
  );

  const renderBody = () => {
    return (
      <View style={styles.infoBooking}>
        <Text style={styles.label}>1. Chọn dịch vụ</Text>
        <SelectService services={services} />
        <Text style={styles.label}>2. Chọn chi nhánh</Text>
        <SelectBranch listService={services} branch={branch} />
        <Text style={styles.label}>3. Chọn stylist & thời gian</Text>
        <SelectStylistAndTime
          onSelectStylist={setStylist}
          bookingDate={date}
          onSelectBookingDate={setDate}
          bookingTime={time}
          onSelectBookingTime={setTime}
          stylist={stylist}
          stylists={stylists as Staff[]}
        />
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      {renderBody()}
      {renderButtonBooking()}
    </View>
  );
};

export default CreateBookingScreen;
