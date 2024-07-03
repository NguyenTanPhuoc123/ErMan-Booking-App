import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard,
  RefreshControl,
} from 'react-native';
import React from 'react';
import globalStyle from '../../constants/styles';
import styles from './style';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useStylist from './useStylist';
import SearchComponent from '../../component/Search';
import {Staff} from '../../modules/user/model';
import ListItemEmpty from '../../component/ListItemEmpty';
import ItemStylistRow from './component/ItemStylistRow';
import {LIST_USER_EMPTY} from '../../constants/icons';

const StylistScreen = () => {
  const {
    goBack,
    stylists,
    listStaffRef,
    pullRefresh,
    refresh,
    loading,
    search,
    setSearch,
    isloadMore,
    loadMore,
    listStylist
  } = useStylist();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
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
        centerComponent={<Text style={styles.titleHeader}>Stylist</Text>}
        rightContainerStyle={styles.rightComponentHeader}
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
  const renderFooterFlatList = () => {
    return !isloadMore ? null : (
      <ActivityIndicator
        style={{padding: 20, marginTop: 20}}
        size={'small'}
        color={'#d4d3d6'}
      />
    );
  };

  const renderStylist = () => (
    <View style={globalStyle.flex1}>
      <FlatList<Staff>
        ref={listStaffRef}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
        }
        numColumns={2}
        data={search ? listStylist : stylists as Staff[]}
        keyExtractor={item => item.id.toString()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <ListItemEmpty image={LIST_USER_EMPTY} content="Không có stylist" />
        }
        renderItem={({item}) => <ItemStylistRow key={item.id} {...item} />}
        ListFooterComponent={renderFooterFlatList}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <SearchComponent placeholder='Stylist, chi nhánh,...' searchValue={search} onSearch={setSearch} />
      {loading ? renderLoading() : renderStylist()}
    </View>
  );
};

export default StylistScreen;
