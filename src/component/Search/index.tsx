import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

type SearchProps = {
  searchValue: string;
  onSearch: (searchValue: string) => void;
  placeholder?: string;
};

const SearchComponent = (props: SearchProps) => {
  const {searchValue, onSearch, placeholder} = props;
  return (
    <View style={styles.containerSearch}>
      <TextInput
        value={searchValue}
        onChangeText={onSearch}
        style={[globalStyle.fontText, styles.inputSearch]}
        placeholder={placeholder}
        placeholderTextColor="#D4D3D6"
      />
      <Icon name="search" style={styles.iconSearch} size={20} />
    </View>
  );
};

export default SearchComponent;
