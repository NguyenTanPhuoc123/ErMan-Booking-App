import {View, RefreshControl, ActivityIndicator} from 'react-native';
import React from 'react';
import globalStyle from '../../../constants/styles';
import {FlatList} from 'react-native';
import useUserManager from './useUserManage';
import SearchComponent from '../../../component/Search';
import {User} from '../../../modules/user/model';
import ListItemEmpty from '../../../component/ListItemEmpty';
import {LIST_USER_EMPTY} from '../../../constants/icons';
import UserItem from './components/UserItem';
import styles from './style';

const UserManagerScreen = () => {
  const {
    listUserRef,
    users,
    refresh,
    pullRefresh,
    search,
    setSearch,
    loading,
    customers,
  } = useUserManager();

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
    <FlatList<User>
      ref={listUserRef}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
      }
      data={search ? customers : users}
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
        placeholder="Họ tên, email..."
        searchValue={search}
        onSearch={setSearch}
      />
      {loading ? renderLoading() : renderBody()}
    </View>
  );
};

export default UserManagerScreen;
