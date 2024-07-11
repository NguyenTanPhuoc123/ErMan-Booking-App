import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React from 'react';
import {Service} from '../../../modules/service/model';
import {LIST_SERVICE_EMPTY} from '../../../constants/icons';
import globalStyle from '../../../constants/styles';
import useServiceManager from './useServiceManager';
import ListItemEmpty from '../../../component/ListItemEmpty';
import ItemServiceRow from './components/ItemServiceRow';
import SearchComponent from '../../../component/Search';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ServiceManagerScreen = () => {
  const {
    services,
    listServiceRef,
    refresh,
    pullRequest,
    search,
    setSearch,
    goToAddService,
    listSearch,
    isLoadMore,
    loading,
    loadMore,
  } = useServiceManager();

  const renderLoading = () => {
    return (
      <ActivityIndicator
        style={styles.loading}
        size={'large'}
        color={'#d4d3d6'}
      />
    );
  };

  const renderLoadMore = () => {
    return !isLoadMore ? null : (
      <ActivityIndicator
        style={{padding: 20, marginTop: 20}}
        size={'small'}
        color={'#d4d3d6'}
      />
    );
  };

  const renderListService = () => (
    <FlatList<Service>
      ref={listServiceRef}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullRequest} />
      }
      numColumns={2}
      data={search != '' ? listSearch : (services as ArrayLike<Service>)}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={
        <ListItemEmpty image={LIST_SERVICE_EMPTY} content="Không có dịch vụ" />
      }
      onScrollBeginDrag={() => Keyboard.dismiss()}
      onEndReachedThreshold={1}
      onEndReached={loadMore}
      renderItem={({item}) => <ItemServiceRow key={item.id} {...item} />}
      ListFooterComponent={renderLoadMore}
    />
  );
  return (
    <View style={globalStyle.container}>
      <SearchComponent
        placeholder="Tên dịch vụ,..."
        searchValue={search}
        onSearch={setSearch}
      />
      {loading ? renderLoading() : renderListService()}
      <TouchableOpacity
        style={[globalStyle.bgPopupCommon, styles.btnAdd]}
        onPress={goToAddService}>
        <Icon name="plus" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ServiceManagerScreen;
