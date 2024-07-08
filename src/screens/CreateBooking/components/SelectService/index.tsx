import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {createRef, useState} from 'react';
import {Service} from '../../../../modules/service/model';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../../../navigation/navigation';
import {
  CREATE_BOOKING_SCREEN,
  SERVICE_SCREEN,
} from '../../../../constants/screen_key';
import globalStyle from '../../../../constants/styles';
import {FormatCurrency} from '../../../../utils/currentcy';

type SelectServiceProps = {
  services: Service[];
};

const SelectService = (props: SelectServiceProps) => {
  const {services} = props;
  let totalPrice = 0;
  const listServiceRef = createRef<FlatList>();

  const getLenghtService = () => {
    if (services.length > 0) {
      services.map(service => {
        totalPrice += service.price;
      });
      return `Đã thêm ${services.length} dịch vụ`;
    }
    return 'Xem tất cả dịch vụ';
  };
  const goToService = () => {
    NavigationActionService.navigate(SERVICE_SCREEN, {
      screen: CREATE_BOOKING_SCREEN,
      services: services,
    });
  };
  const renderListService = () => {
    return (
      <View>
        <FlatList<Service>
          ref={listServiceRef}
          data={services}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Text key={item.id} style={[globalStyle.fontText, styles.service]}>
              {item.serviceName}
            </Text>
          )}
        />
        <Text style={styles.total}>
          Tổng tiền: {FormatCurrency(totalPrice)}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerSelect} onPress={goToService}>
        <Icon name="cut" size={16} color="#d4d3d6" />
        <Text style={styles.text}>{getLenghtService()}</Text>
      </TouchableOpacity>
      {renderListService()}
    </View>
  );
};

export default SelectService;
