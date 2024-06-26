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
import ListItemEmpty from '../../component/ListItemEmpty';
import {LIST_SERVICE_EMPTY} from '../../constants/icons';
import {Tab, TabView} from 'react-native-elements';
import CustomSketelonService from '../../component/CustomSketelonService';

const ServiceScreen = () => {
  const {
    serviceListRef,
    route,
    pullRefresh,
    refresh,
    services,
    category,
    servicesDiscount,
    goToNotifcation,
    categoryService,
    setCategoryService,
    skeleton,
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

  const renderButtonCategory = () => (
    <Tab
      style={styles.containerCategory}
      value={categoryService}
      onChange={setCategoryService}
      indicatorStyle={globalStyle.bgTransparent}>
      {category.map(item => {
        return (
          <Tab.Item
            containerStyle={
              categoryService === item.id
                ? styles.buttonCategoryActive
                : styles.buttonCategory
            }
            titleStyle={[
              globalStyle.fontText,
              categoryService === item.id
                ? styles.txtBtnActive
                : styles.txtBtnCategory,
            ]}
            key={item.id}
            title={item.name}
          />
        );
      })}
    </Tab>
  );

  const renderService = () => (
    <TabView value={categoryService}>
      <FlatList<Service>
        ref={serviceListRef}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
        }
        numColumns={2}
        data={services as ArrayLike<Service>}
        keyExtractor={item => item.id}
        pagingEnabled
        ListEmptyComponent={
          <ListItemEmpty
            image={LIST_SERVICE_EMPTY}
            content="Không có dịch vụ"
          />
        }
        renderItem={({item}) => <ItemServiceRow key={item.id} {...item} />}
      />
      <FlatList<Service>
        ref={serviceListRef}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullRefresh} />
        }
        numColumns={2}
        data={servicesDiscount as ArrayLike<Service>}
        keyExtractor={item => item.id}
        pagingEnabled
        ListEmptyComponent={
          <ListItemEmpty
            image={LIST_SERVICE_EMPTY}
            content="Không có dịch vụ"
          />
        }
        renderItem={({item}) => <ItemServiceRow key={item.id} {...item} />}
      />
    </TabView>
  );
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <SearchComponent />
      {renderButtonCategory()}
      {skeleton ? <CustomSketelonService status={skeleton} /> : renderService()}
    </View>
  );
};

export default ServiceScreen;
