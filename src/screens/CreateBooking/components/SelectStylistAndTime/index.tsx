import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import React from 'react';
import {Staff} from '../../../../modules/user/model';
import FastImage from 'react-native-fast-image';
import {AVARTAR_DEFAULT_STAFF} from '../../../../constants/icons';
import globalStyle from '../../../../constants/styles';
import styles from './style';
import moment from 'moment';
import {compareTimesByHoursMinute} from '../../../../utils/date';
import DateTimePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useSelectStylistAndTime from './useSelectStylistAndTime';

type SelectStylistAndTimeProps = {
  stylists: Staff[];
  stylist?: Staff;
  onSelectStylist: (stylist: Staff) => void;
  bookingDate: string;
  onSelectBookingDate: (date: string) => void;
  bookingTime: string;
  onSelectBookingTime: (time: string) => void;
};

const time = [
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
];

const SelectStylistAndTime = (props: SelectStylistAndTimeProps) => {
  const {
    stylists,
    stylist,
    onSelectStylist,
    bookingDate,
    onSelectBookingDate,
    bookingTime,
    onSelectBookingTime,
  } = props;
  const {stylistRef, timeRef, openPicker, closePicker, open, dateNow, timeNow} =
    useSelectStylistAndTime();
  const status = bookingDate != dateNow;

  const handleSelectStylist = (staff: Staff) => {
    if (staff != stylist) {
      onSelectStylist(staff);
    }
  };

  const handleSelectTime = (time: string) => {
    if (status || compareTimesByHoursMinute(timeNow, time)) {
      if (bookingTime != time) {
        onSelectBookingTime(time);
      }
    }
  };

  const renderDatePicker = () => (
    <View style={styles.selectDate}>
      <Text style={[globalStyle.fontText, styles.labelSelectDate]}>
        Chọn ngày
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[globalStyle.fontText, styles.input]}
          editable={false}
          value={bookingDate}
          selectTextOnFocus={false}
          underlineColorAndroid="#D4D3D6"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={() => openPicker()}>
          <Icon name="calendar-alt" style={globalStyle.fontText} size={22} />
        </TouchableOpacity>
        <DateTimePicker
          date={new Date()}
          mode="date"
          minimumDate={new Date()}
          maximumDate={new Date('2050-12-31')}
          modal
          title="Chọn ngày"
          buttonColor="black"
          confirmText="Xác nhận"
          cancelText="Hủy"
          dividerColor="#000000"
          onConfirm={date => {
            onSelectBookingDate(moment(date).format('DD-MM-YYYY'));
            closePicker();
          }}
          onCancel={() => closePicker()}
          open={open}
        />
      </View>
    </View>
  );

  const renderListTime = () => (
    <FlatList
      ref={timeRef}
      data={time}
      numColumns={5}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => handleSelectTime(item)}
          key={index}
          style={
            status || compareTimesByHoursMinute(timeNow, item)
              ? bookingTime === item
                ? styles.containerSelectedTime
                : styles.containerTime
              : styles.containerTimeClose
          }>
          <Text style={[globalStyle.fontText, styles.time]}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const renderStylistItem = (item: Staff) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.containerStylist}
        onPress={() => handleSelectStylist(item)}>
        <FastImage
          source={!item.avatar ? AVARTAR_DEFAULT_STAFF : {uri: item.avatar}}
          style={styles.avatar}
          resizeMode="cover"
        />
        {stylist?.lastname != item.lastname ? null : (
          <View style={styles.select}>
            <Icon name="check" color="#fff" size={10} />
          </View>
        )}
        <Text style={[globalStyle.fontText, styles.name]}>{item.lastname}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>3. Chọn stylist & thời gian</Text>
      <View>
        <FlatList
          ref={stylistRef}
          data={stylists}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderStylistItem(item)}
        />
      </View>
      <View style={styles.listTime}>
        {renderDatePicker()}
        {renderListTime()}
      </View>
    </View>
  );
};

export default SelectStylistAndTime;
