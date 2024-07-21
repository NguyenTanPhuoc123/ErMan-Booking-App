import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import useWorkScheduleManager from './useWorkScheduleManager';
import styles from './style';
import globalStyle from '../../../constants/styles';
import {Booking} from '../../../modules/booking/model';
import CustomDropDown from '../../../component/CustomDropdown';
import ListItemEmpty from '../../../component/ListItemEmpty';
import {Staff} from '../../../modules/user/model';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {changeDayInWeekToVI, formatStringDate} from '../../../utils/date';
import {Row} from 'react-native-table-component';
import DataItem from './DataItem';

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

const WorkScheduleManagerScreen = () => {
  const {
    pullRefresh,
    refresh,
    loading,
    staffs,
    listBookingRef,
    branchs,
    branchId,
    setBranchId,
    date,
    setDate,
    open,
    setOpen,
    staffId,
    setStaffId,
  } = useWorkScheduleManager();
  const renderLoading = () => {
    return (
      <ActivityIndicator size="large" color="#d4d3d6" style={styles.loading} />
    );
  };
  const renderOptions = () => {
    return (
      <View style={styles.options}>
        <CustomDropDown
          placeholder="Chọn chi nhánh"
          data={branchs}
          label="branchName"
          mode="auto"
          valueField="id"
          value={branchId}
          onChange={value => setBranchId(parseInt(value))}
        />
        <TouchableOpacity>
          <Text style={styles.contentBtnBooking}>Đặt lịch mới</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // const renderListBooking = () => {
  //   return (
  //     <FlatList<Staff>
  //       refreshing={refresh}
  //       onRefresh={pullRefresh}
  //       ref={listBookingRef}
  //       data={staffs}
  //       keyExtractor={item => item.id.toString()}
  //       renderItem={({item}) => }
  //       ListEmptyComponent={
  //         <ListItemEmpty
  //           content="Không có lịch đặt nào"
  //           image={LIST_CALENDAR_EMPTY}
  //         />
  //       }
  //     />
  //   );
  // };

  const renderSchedule = () => {
    return (
      <View style={globalStyle.flex1}>
        <Row data={['Thời gian', 'Lịch đặt']} textStyle={styles.title} />
        <View>
          <FlatList
            data={time}
            renderItem={({item}) => (
              <DataItem key={item} time={item} content="Lúc 10:30" />
            )}
            ListFooterComponent={
              <View style={{padding:30}}/>
            }
          />
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      {renderOptions()}
      <View style={styles.containerSelectDate}>
        <TextInput
          style={[globalStyle.fontText, styles.input]}
          value={changeDayInWeekToVI(new Date(date)) + ', ' + date}
          underlineColorAndroid="#D4D3D6"
          autoCapitalize="none"
          autoCorrect={false}
          editable={false}
          selectTextOnFocus={false}
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Icon name="calendar-alt" size={20} solid color="#d4d3d6" />
        </TouchableOpacity>
        <DatePicker
          date={new Date(formatStringDate(date))}
          open={open}
          mode="date"
          theme="light"
          modal
          onConfirm={date => {
            setDate(moment(date).format('DD-MM-YYYY'));
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </View>
      <View style={styles.options}>
        <CustomDropDown
          placeholder="Chọn nhân viên"
          data={staffs}
          label="lastname"
          mode="auto"
          valueField="id"
          value={staffId}
          onChange={value =>setStaffId(parseInt(value))}
        />
      </View>
      {/* {loading ? renderLoading() : renderListBooking()} */}
      {renderSchedule()}
    </View>
  );
};

export default WorkScheduleManagerScreen;
