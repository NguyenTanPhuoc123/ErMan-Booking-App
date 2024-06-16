import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import globalStyle from '../../constants/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../../modules/auth/model';
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
import { PERSONAL_SCREEN } from '../../constants/screen_key';

const AccountScreen = () => {
  const currentUser = useSelector<RootState, IAuthState>(
    state => state.auth,
  ).userData;
  useEffect(() => {}, []);

  const renderHeader = () => {
    return (
      <View style={styles.showHeader}>
        <Header
          containerStyle={styles.containerHeader}
          backgroundColor="#433F3F"
          centerComponent={<Text style={styles.textAccount}>Tài khoản</Text>}
          rightContainerStyle={styles.rightComponentHeader}
          rightComponent={
            <TouchableOpacity>
              <View>
                <View style={styles.pointNotification}></View>
                <Icon
                  name="bell"
                  size={25}
                  style={globalStyle.fontText}
                  solid
                />
              </View>
            </TouchableOpacity>
          }
        />
      </View>
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
          NavigationActionService.navigate(PERSONAL_SCREEN);
        })}
        {renderButtonFeature('lock', 'Đổi mật khẩu', () => {})}
        {renderButtonFeature('newspaper', 'Tin tức', () => {})}
        {renderButtonFeature('wallet', 'Ví thanh toán', () => {})}
        {renderButtonFeature('cog', 'Cài đặt', () => {})}
        {renderButtonFeature('sign-out-alt', 'Đăng xuất', () => {})}
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
export default AccountScreen;
