import { View, Text } from 'react-native'
import React from 'react'
import {Dropdown} from 'react-native-element-dropdown';
import styles from './style';


type DropDownProps = {
    value:string;
    data:Array<{label:string,value:string}>;
    onChange: (value:string)=>void;
    placeholder?:string;
}
const CustomDropDown = (props:DropDownProps) => {
    const {data,value, onChange, placeholder='Chọn...'} = props;
  return (
    <Dropdown
        value={value}
        data={data}
        style={styles.container}
        selectedTextStyle={styles.selectedItem}
        itemTextStyle={styles.textItem}
        labelField='label'
        valueField='value'
        placeholder={placeholder}
        onChange={(value) => onChange(value.value)}
    />
  )
}

export default CustomDropDown