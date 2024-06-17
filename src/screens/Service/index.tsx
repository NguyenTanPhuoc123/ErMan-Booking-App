import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../constants/styles';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchComponent from './components/Search';
import useService from './useService';
import {SERVICE_CUT_HAIR} from '../../constants/icons';
import ItemServiceRow from './components/ItemServiceRow';

const category = [
  {id: 1, name: 'Tất cả'},
  {id: 2, name: 'Giảm giá'},
];

const dataService = [
  {
    id:1,
    image: SERVICE_CUT_HAIR,
    serviceName: 'Cắt tóc & cạo lông mặt',
    price: 50000,
  },
  {
    id:2,
    image: SERVICE_CUT_HAIR,
    serviceName: 'Cắt tóc & cạo lông mặt',
    price: 50000,
  },
  {
    id:3,
    image: SERVICE_CUT_HAIR,
    serviceName: 'Cắt tóc & cạo lông mặt',
    price: 50000,
  },
  {
    id:4,
    image: SERVICE_CUT_HAIR,
    serviceName: 'Cắt tóc & cạo lông mặt',
    price: 50000,
  },
  {
    id:5,
    image: SERVICE_CUT_HAIR,
    serviceName: 'Cắt tóc & cạo lông mặt',
    price: 50000,
  },
];

const ServiceScreen = () => {
  const {categoryRef, serviceListRef} = useService();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
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
          <TouchableOpacity style={styles.buttonCategory}>
            <Text key={item.id} style={globalStyle.fontText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderService = () => (
      <FlatList
        ref={serviceListRef}
        numColumns={2}
        data={dataService}
        keyExtractor={(item)=>item.id}
        pagingEnabled
        renderItem={({item}) => (
          <ItemServiceRow
            key={item.id}
            image={item.image}
            serviceName={item.serviceName}
            price={item.price}
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
