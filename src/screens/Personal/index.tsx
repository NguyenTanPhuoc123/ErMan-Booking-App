import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../navigation/navigation';
import React, {useEffect} from 'react';
import {Header} from 'react-native-elements';
import styles from '../Personal/style';
import globalStyle from '../../constants/styles';
import {ACCOUNT_SCREEN} from '../../constants/screen_key';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {APP_TYPE} from '../../constants/app_info';
import {
  AVARTAR_DEFAULT_CUSTOMER,
  AVARTAR_DEFAULT_STAFF,
} from '../../constants/icons';
import {IAuthState} from '../../modules/auth/model';
import {RootState} from '../../redux/reducers';

const PersonalScreen = () => {
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
          centerComponent={
            <Text style={styles.textPersonal}>Thông tin cá nhân</Text>
          }
          leftContainerStyle={styles.leftComponentHeader}
          leftComponent={
            <TouchableOpacity onPress={() => NavigationActionService.pop()}>
              <Icon
                name="arrow-left"
                size={25}
                style={globalStyle.fontText}
                solid
              />
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
    </View>
  );

  const renderButtonFeature = (name: string, info: string) => (
    <View style={styles.showName}>
      <Text style={styles.textName}>{name}</Text>
      <Text style={styles.textInfo}>{info}</Text>
    </View>
  );
  const renderInformation = () => (
    <View style={styles.containerBody}>
      {renderButtonFeature(
        'Họ và tên:',
        currentUser.firstname + ' ' + currentUser.lastname,
      )}
      {renderButtonFeature('Giới tính:', 'Nam')}
      {renderButtonFeature('Ngày sinh:', '21/11/2003')}
      {renderButtonFeature(
        'Địa chỉ:',
        '762 Đoàn Văn Bơ, Phường 16, Quận 4, TP.HCM',
      )}
      {renderButtonFeature('Số điện thoại:', currentUser.phone)}
    </View>
  );
  const renderButton = () => (
    <TouchableOpacity style={styles.buttonEdit}>
      <Text style={styles.textEdit}>Chỉnh sửa</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={globalStyle.container}>
        {renderHeader()}
        {renderAvatar()}
        {renderInformation()}
        {renderButton()}
      </View>
    </>
  );
};

export default PersonalScreen;
