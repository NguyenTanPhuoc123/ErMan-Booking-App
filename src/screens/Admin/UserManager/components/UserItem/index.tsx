import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {User} from '../../../../../modules/user/model';
import {AVARTAR_DEFAULT_CUSTOMER} from '../../../../../constants/icons';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../../../../navigation/navigation';
import { ADD_USER_SCREEN } from '../../../../../constants/screen_key';

const UserItem = (props: User) => {
  const {firstname, lastname, phone, avatar} = props;
  const goToEdit = ()=>{
    NavigationActionService.navigate(ADD_USER_SCREEN,{user:props})
  }
  return (
    <TouchableOpacity style={styles.container} onPress={goToEdit}>
      <FastImage
        style={styles.avatar}
        source={!avatar ? AVARTAR_DEFAULT_CUSTOMER : {uri: avatar}}
        resizeMode="cover"
      />
      <View style={styles.containerInfo}>
        <Text style={styles.info}>{firstname + ' ' + lastname}</Text>
        <Text style={styles.info}>Số điện thoại: {phone}</Text>
      </View>
      <TouchableOpacity style={styles.containerButton}>
        <Icon style={styles.textIcon} name="trash-alt" size={26} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default UserItem;
