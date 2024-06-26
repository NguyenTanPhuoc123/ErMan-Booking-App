import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import globalStyle from '../../constants/styles'
import styles from './style';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useMessage from './useMessage';

const MessageScreen = () => {
  const {goToNotifcation} = useMessage();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={styles.titleHeader}>Tin nhắn</Text>
        }
        rightContainerStyle={styles.rightComponentHeader}
        rightComponent={
          <TouchableOpacity onPress={goToNotifcation}>
            <View>
              <View style={styles.pointNotification}></View>
              <Icon name="bell" size={25} style={globalStyle.fontText} solid />
            </View>
          </TouchableOpacity>
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

export default MessageScreen