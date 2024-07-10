import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyle from '../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useAddService from './useAddService';
import styles from './style';
import {Header} from 'react-native-elements';

const AddServiceScreen = () => {
  const {goBack} = useAddService();

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={<Text style={styles.titleHeader}>Thêm dịch vụ</Text>}
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

export default AddServiceScreen;
