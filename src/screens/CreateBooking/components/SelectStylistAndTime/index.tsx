import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import {Staff} from '../../../../modules/user/model';
import FastImage from 'react-native-fast-image';
import {AVARTAR_DEFAULT_STAFF} from '../../../../constants/icons';
import globalStyle from '../../../../constants/styles';
import styles from './style';
import moment from 'moment';
import {
  compareTimesByHoursMinute,
  isTimeAvailable,
} from '../../../../utils/date';
import DateTimePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useSelectStylistAndTime from './useSelectStylistAndTime';
import {getListBooked} from '../../../../modules/booking';
import {useDispatch} from 'react-redux';
import {Service} from '../../../../modules/service/model';

type SelectStylistAndTimeProps = {
  stylists: Staff[];
  stylist?: Staff;
  services?: Service[];
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
    services,
  } = props;
  const {
    stylistRef,
    timeRef,
    openPicker,
    closePicker,
    open,
    onSuccess,
    onFail,
    listTimeBooked,
    listDateBooked,
    totalTime,
  } = useSelectStylistAndTime();
  const dispatch = useDispatch();
  useEffect(() => {
    if (stylist) {
      dispatch(
        getListBooked({
          dateBooking: bookingDate,
          staffId: stylist.id,
          onSuccess: onSuccess,
          onFail: onFail,
        }),
      );
    }
  }, [stylist]);

  const isAvailable = (time: string) => {
    if (services) {
      const times = services.map(services => services.time);
      const total = times.reduce((total, time) => total + time, 0);
      for (const timeBooked of listTimeBooked) {
        if (
          !isTimeAvailable(
            new Date(`${bookingDate}T${timeBooked}`),
            totalTime,
            new Date(`${bookingDate}T${time}`),
            total,
          )
        ) {
          return false;
        }
      }
      return true;
    }
  };
  const status = bookingDate != moment(Date.now()).format('DD-MM-YYYY');
  const handleSelectStylist = (staff: Staff) => {
    if (staff != stylist) {
      onSelectStylist(staff);
    }
  };

  const getTimeStyles = (time: string) => {
    if (status) {
      if (!listDateBooked.includes(bookingDate)) {
        return bookingTime === time
          ? styles.containerSelectedTime
          : styles.containerTime;
      } else {
        if (!listTimeBooked.includes(time)) {
          return bookingTime === time
            ? styles.containerSelectedTime
            : styles.containerTime;
        }
      }
      return styles.containerTimeClose;
    } else {
      if (
        !listTimeBooked.includes(time) &&
        compareTimesByHoursMinute(moment(Date.now()).format('HH:mm'), time) &&
        isAvailable(time)
      ) {
        return bookingTime === time
          ? styles.containerSelectedTime
          : styles.containerTime;
      }
      return styles.containerTimeClose;
    }
  };

  const handleSelectTime = (time: string) => {
    if (status) {
      if (!listDateBooked.includes(bookingDate)) {
        onSelectBookingTime(time);
      } else {
        if (!listTimeBooked.includes(time)) {
          onSelectBookingTime(time);
        }
      }
    } else {
      if (
        !listTimeBooked.includes(time) &&
        compareTimesByHoursMinute(moment(Date.now()).format('HH:mm'), time) &&
        isAvailable(time)
      ) {
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
          style={getTimeStyles(item)}>
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
