import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import globalStyle from '../../../constants/styles';
import HomeScreen from '../../Home';
import useDasboard from './useDashboard';
import { User } from '../../../modules/user/model';

const DashboardScreen = () => {
  const {users} = useDasboard();
  return (
    <View style={globalStyle.container}>
      <FlatList
        data={users}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>(
          <Text style={{margin:20,width:200,height:50,backgroundColor:'red',color:'#fff'}}>{item.firstname+' '+item.lastname}</Text>
        )}
      />
    </View>
  )
}

export default DashboardScreen;