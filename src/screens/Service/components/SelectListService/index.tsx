import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../../../constants/styles';
import {Service} from '../../../../modules/service/model';
import NavigationActionService from '../../../../navigation/navigation';
import {CREATE_BOOKING_SCREEN} from '../../../../constants/screen_key';
import {FormatCurrency} from '../../../../utils/currentcy';

type SelectListServiceProps = {
  listSelected: Service[];
};
const SelectListService = (props: SelectListServiceProps) => {
  const {listSelected} = props;
  const getTotal = () => {
    let price = 0;
    listSelected.forEach((item: Service) => {
      price += item.price;
    });
    return FormatCurrency(price);
  };
  const onCompleted = () => {
    NavigationActionService.replace(CREATE_BOOKING_SCREEN, {
      services: listSelected,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={[globalStyle.fontText, styles.selectedServices]}>
        Đã chọn {listSelected.length} dịch vụ
      </Text>
      <View style={styles.rightComponent}>
        <View>
          <Text style={styles.totalLabel}>Tổng thanh toán</Text>
          <Text style={styles.total}>{getTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.btnComplete} onPress={onCompleted}>
          <Text>Xong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectListService;
