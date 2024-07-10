import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyle from '../../constants/styles';
import {Header} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import styles from './style';
import {
  AVARTAR_DEFAULT_CUSTOMER,
  AVARTAR_DEFAULT_STAFF,
} from '../../constants/icons';
import {APP_TYPE} from '../../constants/app_info';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../navigation/navigation';
import {PROFILE_SCREEN} from '../../constants/screen_key';
import usePersonal from './usePersonal';

const PersonalScreen = () => {
  const {currentUser, showLogout, goToNotifcation} = usePersonal();

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={<Text style={styles.textAccount}>Tài khoản</Text>}
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
  const renderAvatar = () => (
    <View style={styles.showavatar}>
      <FastImage
        style={styles.avatar}
        resizeMode="cover"
        source={
          currentUser.avatar
            ? {uri: currentUser.avatar}
            : APP_TYPE === 'Customer'
            ? AVARTAR_DEFAULT_CUSTOMER
            : AVARTAR_DEFAULT_STAFF
        }
      />
      <View>
        <Text style={styles.textHeader}>
          {currentUser.firstname + ' ' + currentUser.lastname}
        </Text>
      </View>
    </View>
  );

  const renderButtonFeature = (
    icon: string,
    title: string,
    onPress: () => void,
  ) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.show}>
        <Icon name={icon} size={26} style={globalStyle.fontText} solid />
        <Text style={[globalStyle.fontText, styles.content]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBody = () => {
    return (
      <View style={styles.containerBody}>
        {renderButtonFeature('user', 'Xem thông tin cá nhân', () => {
          NavigationActionService.navigate(PROFILE_SCREEN);
        })}
        {renderButtonFeature('lock', 'Đổi mật khẩu', () => {})}
        {renderButtonFeature('wallet', 'Ví thanh toán', () => {})}
        {renderButtonFeature('info-circle', 'Thông tin ứng dụng', () => {})}
        {renderButtonFeature('sign-out-alt', 'Đăng xuất', showLogout)}
      </View>
    );
  };
  return (
    <>
      <View style={globalStyle.container}>
        {renderHeader()}
        {renderAvatar()}
        {renderBody()}
      </View>
    </>
  );
};
export default PersonalScreen;
