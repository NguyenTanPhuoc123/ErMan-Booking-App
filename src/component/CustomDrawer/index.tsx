import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../../modules/auth/model';
import globalStyle from '../../constants/styles';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {AVARTAR_DEFAULT_STAFF} from '../../constants/icons';
import FastImage from 'react-native-fast-image';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../navigation/navigation';
import {MessageType, PopupType} from '../CustomPopup/type';
import {logout} from '../../modules/auth';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const dispatch = useDispatch();
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <FastImage
        source={
          !userData.avatar ? AVARTAR_DEFAULT_STAFF : {uri: userData.avatar}
        }
        style={styles.avatar}
        resizeMode="cover"
      />
      <Text style={styles.name}>
        {userData.firstname + ' ' + userData.lastname}
      </Text>
    </View>
  );
  const renderSignOut = () => (
    <TouchableOpacity onPress={showLogout}>
      <View style={styles.containerbutton}>
        <Text style={[globalStyle.fontText, globalStyle.textSize20]}>
          Đăng xuất{'   '}
        </Text>
        <Icon name="sign-out-alt" size={20} color="#d4d3d6" solid />
      </View>
    </TouchableOpacity>
  );
  const showLogout = () => {
    NavigationActionService.showPopup({
      type: PopupType.TWO_BUTTONS,
      typeMessage: MessageType.COMMON,
      title: 'Đăng xuất',
      message: 'Bạn chắc chắc muốn đăng xuất?',
      onPressPrimaryBtn: () => {
        dispatch(
          logout({
            onSuccess: () => {},
            onFail: () =>
              NavigationActionService.showPopup({
                type: PopupType.ONE_BUTTON,
                typeMessage: MessageType.ERROR,
                title: 'Đăng xuất',
                message: 'Có một lỗi gì đó đã xảy ra!',
              }),
          }),
        );
      },
    });
  };

  return (
    <View style={globalStyle.flex1}>
      {renderHeader()}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    {renderSignOut()}
    </View>
  );
};
export default CustomDrawer;