import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import styles from './style';
import globalStyle from '../../../../../constants/styles';

const SearchComponent = () => {
  return (
    <View style={styles.containerSearch}>
      <TextInput
        style={[globalStyle.fontText, styles.inputSearch]}
        placeholder="Tên,..."
        placeholderTextColor="#D4D3D6"
      />
      <TouchableOpacity style={styles.btnSearch}>
        <Icon name="search" style={[globalStyle.fontText]} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;
