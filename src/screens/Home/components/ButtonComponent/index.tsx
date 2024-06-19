import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle from '../../../../constants/styles';
import styles from './style';
type ButtonComponentProps = {
    title:string,
    icon:string,
    onPress:()=>void
}
const ButtonComponent = (props:ButtonComponentProps) => {
    const {title,icon,onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon name={icon} color='#494946' size={24} solid />
        <Text style={[globalStyle.fontText,styles.title]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent