import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import React from 'react';
import useWorkScheduleManager from './useWorkScheduleManager';
import styles from './style';
import globalStyle from '../../../constants/styles';
import {Booking} from '../../../modules/booking/model';
import BookingItem from './BookingItem';
import CustomDropDown from '../../../component/CustomDropdown';
import ListItemEmpty from '../../../component/ListItemEmpty';
import {LIST_CALENDAR_EMPTY} from '../../../constants/icons';
import { Staff } from '../../../modules/user/model';

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
  } = useWorkScheduleManager();
  const renderLoading = () => {
    return (
      <ActivityIndicator size="large" color="#d4d3d6" style={styles.loading} />
    );
  };
  const renderDropdown = () => {
    return (
      <View style={styles.dropdown}>
        <CustomDropDown
          placeholder="Chọn chi nhánh"
          data={branchs}
          label="branchName"
          mode="auto"
          valueField="id"
          value={branchId}
          onChange={value => setBranchId(parseInt(value))}
        />
      </View>
    );
  };
  const renderListBooking = () => {
    return (
      <FlatList<Staff>
        refreshing={refresh}
        numColumns={2}
        onRefresh={pullRefresh}
        ref={listBookingRef}
        data={staffs}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <BookingItem key={item.id} {...item} />}
        ListEmptyComponent={
          <ListItemEmpty
            content="Không có lịch đặt nào"
            image={LIST_CALENDAR_EMPTY}
          />
        }
      />
    );
  };

  return (
    <View style={globalStyle.container}>
      {renderDropdown()}
      {loading ? renderLoading() : renderListBooking()}
    </View>
  );
};

export default WorkScheduleManagerScreen;
