import { View, Text } from 'react-native'
import React from 'react'
import styles from './style';
import { Header } from 'react-native-elements';
import globalStyle from '../../../constants/styles';

const UserManagerScreen = () => {
    const renderHeader = () => {
        return (
          <Header
            containerStyle={styles.containerHeader}
            backgroundColor="#433F3F"
            centerComponent={
              <Text style={styles.titleHeader}>Quản lý người dùng</Text>
            }
          />
        );
      };
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
    </View>
  )
}

export default UserManagerScreen