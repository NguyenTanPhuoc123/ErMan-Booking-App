import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Keyboard,
} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../constants/styles';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useCalendar from './useCalendar';

import DatePicker, { EventTypes } from 'react-native-month-year-picker';
import moment from 'moment';
import {getMonthYearLong} from '../../utils/date';
import WorkScheduleItem from './components/WorkScheduleItem';
import {WorkSchedule} from '../../modules/workschedule/model';
import ListItemEmpty from '../../component/ListItemEmpty';
import {Staff} from '../../modules/user/model';
import {LIST_CALENDAR_EMPTY} from '../../constants/icons';

const CalendarScreen = () => {
  const {
    open,
    openPicker,
    closePicker,
    goBack,
    refresh,
    pullRefresh,
    userData,
    workSchedules,
    listWorkScheduleRef,
    loading,
    date,
    onValueChange
  } = useCalendar();

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={styles.titleHeader}>{getMonthYearLong(date)}</Text>
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
            {open && (
              <DatePicker
                value={date}
                minimumDate={new Date()}
                maximumDate={new Date(2050,12)}
                mode="full"
                okButton="Xác nhận"
                cancelButton="Hủy"
                locale='vi'
                onChange={onValueChange}
              />
            )}
          </>
        }
      />
    );
  };

  const renderLoading = () => {
    return (
      <ActivityIndicator
        style={styles.loading}
        size={'large'}
        color={'#d4d3d6'}
      />
    );
  };

  const renderBody = () => (
    <View style={globalStyle.flex1}>
      <FlatList<WorkSchedule>
        ref={listWorkScheduleRef}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
        }
        data={workSchedules}
        keyExtractor={item => item.id.toString()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <ListItemEmpty
            image={LIST_CALENDAR_EMPTY}
            content="Không có lịch làm việc"
          />
        }
        renderItem={({item}) => (
          <WorkScheduleItem
            key={item.id}
            workSchedule={item}
            staff={userData as Staff}
          />
        )}
        // ListFooterComponent={renderFooterFlatList}
        // onEndReached={loadMore}
        // onEndReachedThreshold={1}
      />
    </View>
  );

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      {loading ? renderLoading() : renderBody()}
    </View>
  );
};

export default CalendarScreen;
