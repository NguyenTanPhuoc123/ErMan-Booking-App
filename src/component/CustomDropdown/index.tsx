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
  disable?: boolean;
};
const CustomDropDown = (props: DropDownProps) => {
  const {
    data,
    value,
    disable = false,
    onChange,
    label,
    valueField,
    placeholder = 'Chọn...',
  } = props;

  return (
    <Dropdown
      data={data}
      value={value}
      mode="modal"
      style={styles.container}
      selectedTextStyle={styles.selectedItem}
      itemTextStyle={styles.textItem}
      labelField={label}
      valueField={valueField}
      maxHeight={150}
      disable={disable}
      placeholder={placeholder}
      onChange={value => {
        onChange(value.id || value.value);
      }}
    />
  );
};

export default CustomDropDown;
