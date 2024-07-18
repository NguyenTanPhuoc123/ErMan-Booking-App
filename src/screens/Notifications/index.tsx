import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import globalStyle from '../../constants/styles';
import styles from './style';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useNotification from './useNotification';
import NotificationItem from './components';
import ListItemEmpty from '../../component/ListItemEmpty';
import {LIST_NOTIFICATION_EMPTY} from '../../constants/icons';
import {Notification} from '../../modules/notification/model';

const NotificationScreen = () => {
  const {goBack, listNotificationRef, notifications} = useNotification();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        leftComponent={
          <TouchableOpacity onPress={goBack}>
            <Icon
              name="arrow-left"
              size={25}
              style={globalStyle.fontText}
              solid
            />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.titleHeader}>Thông báo</Text>}
      />
    );
  };

  const renderBody = () => {
    return (
      <FlatList<Notification>
        ref={listNotificationRef}
        data={notifications}
        renderItem={({item}) => {
          return <NotificationItem key={item.id} {...item} />;
        }}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <ListItemEmpty
            content="Không có thông báo "
            image={LIST_NOTIFICATION_EMPTY}
          />
        }
      />
    );
  };

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      {renderBody()}
    </View>
  );
};

export default NotificationScreen;
