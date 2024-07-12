import {View, RefreshControl} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../../constants/styles';
import {FlatList} from 'react-native';
import useUserManager from './useUserManage';
import SearchComponent from '../../../component/Search';
import {User} from '../../../modules/user/model';
import ListItemEmpty from '../../../component/ListItemEmpty';
import {LIST_USER_EMPTY} from '../../../constants/icons';
import UserItem from './components/UserItem';

const UserManagerScreen = () => {
  const {listUserRef, listtusers, refresh, pullRefresh} = useUserManager();

  const renderBody = () => (
    <FlatList<User>
      ref={listUserRef}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
      }
      data={listtusers}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={
        <ListItemEmpty image={LIST_USER_EMPTY} content="Không có người dùng" />
      }
      renderItem={({item}) => <UserItem key={item.id} {...item} />}
    />
  );

  return (
    <View style={globalStyle.container}>
      <SearchComponent
        placeholder="Tên khách hàng..."
        searchValue=""
        onSearch={value => {}}
      />
      {renderBody()}
    </View>
  );
};

export default UserManagerScreen;
