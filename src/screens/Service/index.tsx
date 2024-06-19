import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../constants/styles';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchComponent from './components/Search';
import useService from './useService';
import ItemServiceRow from './components/ItemServiceRow';
import NavigationActionService from '../../navigation/navigation';
import {Service} from '../../modules/service/model';

const category = [
  {id: 1, name: 'Tất cả', onPress: (active:boolean) => {}, active: true},
  {id: 2, name: 'Giảm giá', onPress: () => {}, active: false},
];

const ServiceScreen = () => {
  const {categoryRef, serviceListRef, route, pullRefresh, refresh, services} =
    useService();
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
          <TouchableOpacity>
            <View>
              <View style={styles.pointNotification}></View>
              <Icon name="bell" size={25} style={globalStyle.fontText} solid />
            </View>
          </TouchableOpacity>
        }
      />
    );
  };

  const renderButtonCategory = () => (
    <View>
      <FlatList
        horizontal
        ref={categoryRef}
        keyExtractor={(item, _) => item.id}
        data={category}
        renderItem={({item}) => (
          <TouchableOpacity onPress={item.onPress}
            style={
              item.active ? styles.buttonCategoryActive : styles.buttonCategory
            }>
            <Text
              key={item.id}
              style={[
                globalStyle.fontText,
                item.active ? styles.txtBtnActive : null,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderService = () => (
    <FlatList<Service>
      ref={serviceListRef}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
      }
      numColumns={2}
      data={services as ArrayLike<Service>}
      keyExtractor={item => item.id}
      pagingEnabled
      renderItem={({item}) => (
        <ItemServiceRow
          key={item.id}
          id={item.id}
          image={item.image}
          serviceName={item.serviceName}
          price={item.price}
          description={item.description}
        />
      )}
    />
  );
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <SearchComponent />
      {renderButtonCategory()}
      {renderService()}
    </View>
  );
};

export default ServiceScreen;
