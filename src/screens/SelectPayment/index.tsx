import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';
import styles from './style';
import globalStyle from '../../constants/styles';
import useSelectPayment from './useSelectPayment';
import Icon from 'react-native-vector-icons/FontAwesome5';
const SelectPaymentScreen = () => {
  const {goBack} = useSelectPayment();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={[globalStyle.fontText, styles.titleHeader]}>
            Cách thức thanh toán
          </Text>
        }
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
      />
    );
  };
  return <View style={globalStyle.container}>{renderHeader()}</View>;
};

export default SelectPaymentScreen;
