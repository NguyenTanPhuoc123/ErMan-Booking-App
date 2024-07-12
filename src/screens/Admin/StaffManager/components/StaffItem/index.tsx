import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {User} from '../../../../../modules/user/model';
import NavigationActionService from '../../../../../navigation/navigation';
import {ADD_USER_SCREEN} from '../../../../../constants/screen_key';
import FastImage from 'react-native-fast-image';
import {AVARTAR_DEFAULT_CUSTOMER} from '../../../../../constants/icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StaffItem = (props: User) => {
  const {firstname, lastname, email, avatar, typeAccount} = props;
  const goToEdit = () => {
    NavigationActionService.navigate(ADD_USER_SCREEN, {user: props});
  };
  return (
    <TouchableOpacity style={styles.container} onPress={goToEdit}>
      <FastImage
        style={styles.avatar}
        source={!avatar ? AVARTAR_DEFAULT_CUSTOMER : {uri: avatar}}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.info}>{firstname + ' ' + lastname}</Text>
        <Text style={styles.info}>Email: {email}</Text>
        <Text style={styles.info}>
          Loại tài khoản: {typeAccount === 'Staff' ? 'Nhân viên' : 'Admin'}
        </Text>
      </View>
      <TouchableOpacity style={styles.containerButton}>
        <Icon color="#FF8572" name="trash-alt" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default StaffItem;
