import {
    View,
    Text,
    FlatList,
    RefreshControl,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
  import style from './style';
  import globalStyle from '../../../constants/styles';
  import Search_Branch from './components/Search';
  import {Branch} from '../../../modules/branch/model';
  import useBranchManager from './useBranchManager';
  import ListItemEmpty from '../../../component/ListItemEmpty';
  import {LIST_BRANCH_EMPTY} from '../../../constants/icons';
  import ItemBranchRow from './components/ItemBranchRow';
  
  const BranchManagerScreen = () => {
    const {branchs, listBranchRef, refresh, pullRequest, isLoadMore, loadMore} =
      useBranchManager();
  
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
        data={branchs as ArrayLike<Branch>}
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
        <Search_Branch />
        {renderListBranch()}
      </View>
    );
  };
  
  export default BranchManagerScreen;
  