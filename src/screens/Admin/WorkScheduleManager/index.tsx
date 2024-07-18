import { View, Text } from 'react-native'
import React from 'react'
import useWorkScheduleManager from './useWorkScheduleManager'
import styles from './style';
import globalStyle from '../../../constants/styles';

const WorkScheduleManagerScreen = () => {
    const {} = useWorkScheduleManager();
  return (
    <View style={globalStyle.container}>
      <Text>WorkScheduleManagerScreen</Text>
    </View>
  )
}

export default WorkScheduleManagerScreen