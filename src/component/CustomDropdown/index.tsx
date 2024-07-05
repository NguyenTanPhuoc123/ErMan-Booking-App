import {View, Text} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './style';

type DropDownProps = {
  value: number | string;
  data: Array<any>;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  valueField: string;
};
const CustomDropDown = (props: DropDownProps) => {
  const {data, value, onChange, label,valueField, placeholder = 'Chọn...'} = props;

  return (
    <Dropdown
      data={data}
      value={value}
      style={styles.container}
      selectedTextStyle={styles.selectedItem}
      itemTextStyle={styles.textItem}
      labelField={label}
      valueField={valueField}
      maxHeight={150}
      placeholder={placeholder}
      onChange={value => {onChange(value.id || value.value);
      }}
    />
  );
};

export default CustomDropDown;
