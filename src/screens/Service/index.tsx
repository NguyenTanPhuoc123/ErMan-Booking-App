import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import styles from './style';
import globalStyle from '../../constants/styles';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useService from './useService';
import ItemServiceRow from './components/ItemServiceRow';
import NavigationActionService from '../../navigation/navigation';
import {Service} from '../../modules/service/model';
import ListItemEmpty from '../../component/ListItemEmpty';
import {LIST_SERVICE_EMPTY} from '../../constants/icons';
import {Tab, TabView} from 'react-native-elements';
import SearchComponent from '../../component/Search';

const ServiceScreen = () => {
  const {
    serviceListRef,
    route,
    pullRefresh,
    refresh,
    services,
    category,
    goToNotifcation,
    search,
    setSearch,
    loadMore,
    isLoadMore,
    loading,
    listSearch,
  } = useService();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        leftComponent={
          route.params ? (
            <TouchableOpacity onPress={() => NavigationActionService.pop()}>
              <Icon
                name="arrow-left"
                size={25}
                style={globalStyle.fontText}
                solid
              />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        centerComponent={<Text style={styles.textHeader}>Dịch vụ</Text>}
        rightContainerStyle={styles.rightComponentHeader}
        rightComponent={
          <TouchableOpacity onPress={goToNotifcation}>
            <View>
              <View style={styles.pointNotification}></View>
              <Icon name="bell" size={25} style={globalStyle.fontText} solid />
            </View>
          </TouchableOpacity>
        }
      />
    );
  };

  const renderLoading = useCallback(() => {
    return (
      <ActivityIndicator
        style={styles.loading}
        size={'large'}
        color={'#d4d3d6'}
      />
    );
  }, [loading]);

  const renderLoadMore = () => {
    return !isLoadMore ? null : (
      <ActivityIndicator
        style={{padding: 20, marginTop: 20}}
        size={'small'}
        color={'#d4d3d6'}
      />
    );
  };
  const renderService = () => (
    <FlatList<Service>
      ref={serviceListRef}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
      }
      numColumns={2}
      data={search != '' ? listSearch : services}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <ListItemEmpty image={LIST_SERVICE_EMPTY} content="Không có dịch vụ" />
      }
      renderItem={({item}) => <ItemServiceRow key={item.id} {...item} />}
      ListFooterComponent={renderLoadMore()}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
    />
  );
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <SearchComponent
        placeholder="Tên dịch vụ,..."
        searchValue={search}
        onSearch={setSearch}
      />
      {loading ? renderLoading() : renderService()}
    </View>
  );
};

export default ServiceScreen;
