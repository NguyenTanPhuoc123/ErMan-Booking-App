import { View, Text } from 'react-native'
import React from 'react'
import globalStyle from '../../../constants/styles';
import HomeScreen from '../../Home';

const DashboardScreen = () => {
  return (
    <View style={globalStyle.container}>
      {HomeScreen()}
    </View>
  )
}

export default DashboardScreen;