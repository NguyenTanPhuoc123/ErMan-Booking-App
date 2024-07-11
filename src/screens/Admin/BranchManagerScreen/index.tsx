import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import globalStyle from '../../../constants/styles';
import {Branch} from '../../../modules/branch/model';
import useBranchManager from './useBranchManager';
import ListItemEmpty from '../../../component/ListItemEmpty';
import {LIST_BRANCH_EMPTY} from '../../../constants/icons';
import ItemBranchRow from './components/ItemBranchRow';
import SearchComponent from '../../../component/Search';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BranchManagerScreen = () => {
  const {
    branchs,
    listBranchRef,
    refresh,
    pullRequest,
    isLoadMore,
    loadMore,
    search,
    setSearch,
    loading,
    listBranch,
    goToAddBranch,
  } = useBranchManager();

  const renderLoading = () => {
    return <ActivityIndicator size="large" style={styles.loading} />;
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

  const renderListBranch = () => (
    <FlatList<Branch>
      ref={listBranchRef}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullRequest} />
      }
      numColumns={2}
      data={search != '' ? listBranch : (branchs as ArrayLike<Branch>)}
      keyExtractor={item => item.id.toString()}
      scrollEventThrottle={16}
      ListEmptyComponent={
        <ListItemEmpty image={LIST_BRANCH_EMPTY} content="Không có chi nhánh" />
      }
      renderItem={({item}) => <ItemBranchRow key={item.id} {...item} />}
      ListFooterComponent={renderFooterFlatList}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
    />
  );

  return (
    <View style={globalStyle.container}>
      <SearchComponent
        searchValue={search}
        onSearch={setSearch}
        placeholder="Tên,địa chỉ..."
      />
      {loading ? renderLoading() : renderListBranch()}
      <TouchableOpacity
        style={[globalStyle.bgPopupCommon, styles.btnAdd]}
        onPress={goToAddBranch}>
        <Icon name="plus" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default BranchManagerScreen;
