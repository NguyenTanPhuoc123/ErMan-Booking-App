import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Notification} from '../../../modules/notification/model';
import styles from './style';
import globalStyle from '../../../constants/styles';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {updateStatusRead} from '../../../modules/notification';
import NavigationActionService from '../../../navigation/navigation';
import {MY_BOOKING_STACK} from '../../../constants/screen_key';

const NotificationItem = (props: Notification) => {
  const {title, message, createTime, isRead, id} = props;
  
  const dispatch = useDispatch();
  const newMess = message.substring(0, 100);
  const handleRead = () => {
    NavigationActionService.navigate(MY_BOOKING_STACK);
    dispatch(
      updateStatusRead({
        notificationId: id,
      }),
    );
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={handleRead}>
      <Text style={styles.title}>{title}</Text>
      <Text style={globalStyle.fontText}>
        {message.length === newMess.length ? message : newMess + '...'}
      </Text>
      <Text style={[globalStyle.fontText, styles.time]}>
        {moment(createTime).format('DD-MM-YYYY HH:mm')}
      </Text>
      {isRead ? null : <View style={styles.dot}></View>}
    </TouchableOpacity>
  );
};

export default NotificationItem;
