import {View, RefreshControl, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../../constants/styles';
import SearchComponent from '../../../component/Search';
import useStaffManage from './userStaffManage';
import {User} from '../../../modules/user/model';
import {FlatList} from 'react-native';
import ListItemEmpty from '../../../component/ListItemEmpty';
import StaffItem from './components/StaffItem';
import {LIST_USER_EMPTY} from '../../../constants/icons';
import {ADD_USER_SCREEN} from '../../../constants/screen_key';
import NavigationActionService from '../../../navigation/navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StaffManagerScreen = () =>{
    const {listStaffRef, pullRefresh, refresh, listtusers} =
    useStaffManage();

  const renderBody = () => (
    <FlatList<User>
      ref={listStaffRef}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
      }
      data={listtusers}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={
        <ListItemEmpty image={LIST_USER_EMPTY} content="Không có người dùng" />
      }
      renderItem={({item}) => <StaffItem key={item.id} {...item} />}
    />
  );
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
        placeholder="Tên nhân viên..."
        searchValue=""
        onSearch={value => {}}
      />
      {renderBody()}
      {renderButtonAdd()}
    </View>
  );


}

export default StaffManagerScreen;