import {
  View,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../../constants/styles';
import SearchComponent from '../../../component/Search';
import useStaffManage from './userStaffManage';
import {Staff, User} from '../../../modules/user/model';
import {FlatList} from 'react-native';
import ListItemEmpty from '../../../component/ListItemEmpty';
import StaffItem from './components/StaffItem';
import {LIST_USER_EMPTY} from '../../../constants/icons';
import {ADD_USER_SCREEN} from '../../../constants/screen_key';
import NavigationActionService from '../../../navigation/navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StaffManagerScreen = () => {
  const {
    listStaffRef,
    pullRefresh,
    refresh,
    staffs,
    search,
    setSearch,
    loading,
    listStaff,
  } = useStaffManage();

  const renderBody = () => (
    <FlatList<Staff>
      ref={listStaffRef}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
      }
      data={search ? listStaff : staffs}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={
        <ListItemEmpty image={LIST_USER_EMPTY} content="Không có người dùng" />
      }
      renderItem={({item}) => <StaffItem key={item.id} {...item} />}
    />
  );

  const renderLoading = () => {
    return (
      <ActivityIndicator
        style={styles.loading}
        size={'large'}
        color={'#d4d3d6'}
      />
    );
  };

  const renderButtonAdd = () => (
    <TouchableOpacity
      style={[globalStyle.bgPopupCommon, styles.containerButton]}
      onPress={() => {
        NavigationActionService.navigate(ADD_USER_SCREEN);
      }}>
      <Icon name="plus" size={24} />
    </TouchableOpacity>
  );

  return (
    <View style={globalStyle.container}>
      <SearchComponent
        placeholder="Tên, chi nhánh..."
        searchValue={search}
        onSearch={setSearch}
      />
      {loading ? renderLoading() : renderBody()}
      {renderButtonAdd()}
    </View>
  );
};

export default StaffManagerScreen;
