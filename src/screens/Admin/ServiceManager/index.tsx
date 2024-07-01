import {View, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import Search_Service from './components/Search';
import {Service} from '../../../modules/service/model';
import {LIST_SERVICE_EMPTY} from '../../../constants/icons';
import globalStyle from '../../../constants/styles';
import useServiceManager from './useServiceManager';
import ListItemEmpty from '../../../component/ListItemEmpty';
import ItemServiceRow from './components/ItemServiceRow';

const ServiceManagerScreen = () => {
  const {services,listServiceRef,refresh,pullRequest} = useServiceManager();
  const renderListService = ()=>(
    <FlatList<Service>
        ref={listServiceRef}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullRequest} />
        }
        numColumns={2}
        data={services as ArrayLike<Service>}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <ListItemEmpty
            image={LIST_SERVICE_EMPTY}
            content="Không có dịch vụ"
          />
        }
        renderItem={({item}) => <ItemServiceRow key={item.id} {...item} />}
      />
  )
  return (
    <View style={globalStyle.container}>
      <Search_Service />
      {renderListService()}
    </View>
  );
};

export default ServiceManagerScreen;
