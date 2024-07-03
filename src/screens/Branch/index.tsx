import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React from 'react';
import globalStyle from '../../constants/styles';
import styles from './style';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useBranch from './useBranch';
import SearchComponent from '../../component/Search';
import {Branch} from '../../modules/branch/model';
import ListItemEmpty from '../../component/ListItemEmpty';
import {LIST_BRANCH_EMPTY} from '../../constants/icons';
import ItemBranchRow from './components/ItemBranchRow';

const BranchScreen = () => {
  const {
    goBack,
    listBranchRef,
    refresh,
    listBranch,
    pullRefresh,
    loadMore,
    isLoadMore,
    search,
    setSearch,
    branchs,
    loading,
  } = useBranch();
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
        centerComponent={<Text style={styles.titleHeader}>Chi nhánh</Text>}
        rightContainerStyle={styles.rightComponentHeader}
      />
    );
  };

  const renderBranchNear = () => (
    <TouchableOpacity style={styles.btnBranchNear}>
      <Icon name="map-marker-alt" size={20} solid color="red" />
      <Text style={styles.contentBtn}>Chi nhánh gần tôi</Text>
    </TouchableOpacity>
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
  const renderFooterFlatList = () => {
    return !isLoadMore ? null : (
      <ActivityIndicator
        style={{padding: 20, marginTop: 20}}
        size={'small'}
        color={'#d4d3d6'}
      />
    );
  };

  const renderBranch = () => (
    <View style={globalStyle.flex1}>
      <FlatList<Branch>
        ref={listBranchRef}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
        }
        numColumns={2}
        data={search === '' ? branchs : listBranch}
        keyExtractor={item => item.id.toString()}
        onScrollBeginDrag={() => Keyboard.dismiss()}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <ListItemEmpty
            image={LIST_BRANCH_EMPTY}
            content="Không có chi nhánh"
          />
        }
        renderItem={({item}) => <ItemBranchRow key={item.id} {...item} />}
        ListFooterComponent={renderFooterFlatList}
        onEndReached={loadMore}
        onEndReachedThreshold={1}
      />
    </View>
  );

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <SearchComponent
        placeholder="Tên chi nhánh, địa chỉ,..."
        searchValue={search}
        onSearch={setSearch}
      />
      {renderBranchNear()}
      {loading ? renderLoading() : renderBranch()}
    </View>
  );
};

export default BranchScreen;
