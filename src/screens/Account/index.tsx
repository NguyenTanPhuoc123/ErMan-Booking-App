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

const AccountScreen = () => {
  const currentUser = useSelector<RootState, IAuthState>(
    state => state.auth,
  ).userData;
  useEffect(() => {}, []);

  return (
    <View style={globalStyle.container}>
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={<Text style={styles.textTaiKhoan}>Tài khoản</Text>}
        rightContainerStyle={styles.rightComponentHeader}
        rightComponent={
          <TouchableOpacity>
            <View>
              <View style={styles.pointNotification}></View>
              <Icon name="bell" size={25} style={globalStyle.fontText} solid />
            </View>
          </TouchableOpacity>
        }
      />
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
            {currentUser.firstname} {''}
            {currentUser.lastname}
          </Text>
        </View>
      </View>
      <View style={styles.containerBody}>
        <TouchableOpacity>
          <View style={styles.showuser}>
            <Icon name="user" size={40} style={globalStyle.fontText} solid />
            <Text style={[globalStyle.fontText, styles.textUser]}>
              Xem thông tin cá nhân
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.showuser}>
            <Icon
              name="calendar-alt"
              size={40}
              style={globalStyle.fontText}
              solid
            />
            <Text style={[globalStyle.fontText, styles.textUser]}>
              Đổi mật khẩu
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.showuser}>
            <Icon
              name="newspaper"
              size={40}
              style={globalStyle.fontText}
              solid
            />
            <Text style={[globalStyle.fontText, styles.textUser]}>Tin tức</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.showuser}>
            <Icon name="wallet" size={40} style={globalStyle.fontText} solid />
            <Text style={[globalStyle.fontText, styles.textUser]}>
              Ví thanh toán
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.showuser}>
            <Icon name="cog" size={40} style={globalStyle.fontText} solid />
            <Text style={[globalStyle.fontText, styles.textUser]}>Cài đặt</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.showuser}>
            <Icon
              name="sign-out-alt"
              size={40}
              style={globalStyle.fontText}
              solid
            />
            <Text style={[globalStyle.fontText, styles.textUser]}>
              Đăng xuất
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
