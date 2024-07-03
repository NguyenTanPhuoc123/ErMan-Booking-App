import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import globalStyle from '../../constants/styles';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useCalendar from './useCalendar';

import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {getMonthYearLong} from '../../utils/date';
import WorkScheduleItem from './components/WorkScheduleItem';

const CalendarScreen = () => {
  const {
    index,
    setIndex,
    open,
    openPicker,
    closePicker,
    goBack,
  } = useCalendar();

  const [date, setDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <Header
        containerStyle={style.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={style.titleHeader}>{getMonthYearLong(date)}</Text>
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
        rightComponent={
          <>
            <TouchableOpacity onPress={() => openPicker()}>
              <Icon
                name="calendar-alt"
                size={25}
                style={globalStyle.fontText}
                solid
              />
            </TouchableOpacity>

            <DatePicker
              date={date}
              mode="date"
              modal
              title="Chọn tháng, năm..."
              buttonColor="black"
              confirmText="Xác nhận"
              cancelText="Hủy"
              dividerColor="#000000"
              onConfirm={date => {
                setDate(date);
                closePicker();
              }}
              onCancel={closePicker}
              open={open}
            />
          </>
        }
      />
    );
  };

  const renderBody = () => (
    <View>
      {/* <ScrollView>
        <View style={{flexDirection:"column",paddingLeft:20,paddingTop:40}}>
          <Text style={{color:'#817AC7',fontSize:24, fontFamily:InriaSerifBold}}>{moment(date).format('ddd')}</Text>
          <Text style={{color:'#817AC7',marginLeft:10,fontSize:24, fontFamily:InriaSerifBold}}>{moment(date).format('DD')}</Text>
        </View>
      </ScrollView> */}
    </View>
  );

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <WorkScheduleItem/>
    </View>
  );
};

export default CalendarScreen;
