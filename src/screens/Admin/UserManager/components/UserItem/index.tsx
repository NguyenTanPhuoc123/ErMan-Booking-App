import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {User} from '../../../../../modules/user/model';
import {AVARTAR_DEFAULT_CUSTOMER} from '../../../../../constants/icons';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../../../../navigation/navigation';
import {ADD_USER_SCREEN} from '../../../../../constants/screen_key';
import { useDispatch } from 'react-redux';
import { MessageType, PopupType } from '../../../../../component/CustomPopup/type';
import { ApiError } from '../../../../../constants/api';
import { deleteUser } from '../../../../../modules/user';

const UserItem = (props: User) => {
  const {firstname, lastname, email, avatar,id} = props;
  const goToEdit = () => {
    NavigationActionService.navigate(ADD_USER_SCREEN, {user: props});
  };
  const dispatch = useDispatch();

  const confirmDelete = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Xóa khách hàng',
      message:
        'Sau khi xóa khách hàng, các dữ liệu liên quan đến có thể sẽ mất, bạn chắc chắn muốn xóa chứ?',
      onPressPrimaryBtn: deleteOneUser,
    });
  };

  const onDeleteSuccess = () => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.COMMON,
      title: 'Xóa nhân viên',
      message: 'Xóa nhân viên thành công',
    });
  };

  const onDeleteFail = (error?: ApiError) => {
    NavigationActionService.hideLoading();
    NavigationActionService.showPopup({
      type: PopupType.ONE_BUTTON,
      typeMessage: MessageType.ERROR,
      title: 'Lỗi xóa nhân viên',
      message: error?.message || 'Có lỗi gì đó đã xảy ra',
    });
  };

  const deleteOneUser = () => {
    dispatch(
      deleteUser({
        id: id,
        onSuccess: onDeleteSuccess,
        onFail: onDeleteFail,
      }),
    );
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
      </View>
      <TouchableOpacity style={styles.containerButton} onPress={confirmDelete}>
        <Icon color="#FF8572" name="trash-alt" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default UserItem;
