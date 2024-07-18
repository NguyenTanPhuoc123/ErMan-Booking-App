import {View, Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import NavigationActionService from '../../navigation/navigation';
import {NOTIFICATION_SCREEN} from '../../constants/screen_key';
import styles from './style';
import globalStyle from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {INotificationState} from '../../modules/notification/model';
const Notification = () => {
  const notificationReadAlready = useSelector<RootState, INotificationState>(
    state => state.notification,
  ).notifications.filter(notification=>notification.isRead===false);
  const goToNotifcation = () => {
    NavigationActionService.navigate(NOTIFICATION_SCREEN);
  };
  return (
    <TouchableOpacity onPress={goToNotifcation}>
      <View>
        {notificationReadAlready.length <= 0 ? null : (
          <View style={styles.pointNotification}></View>
        )}
        <Icon name="bell" style={globalStyle.fontText} size={25} solid />
      </View>
    </TouchableOpacity>
  );
};

export default Notification;
