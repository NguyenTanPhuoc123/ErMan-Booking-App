import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../../navigation/navigation';
import React from 'react';
import {Header} from 'react-native-elements';
import styles from './style';
import globalStyle from '../../../constants/styles';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {APP_TYPE} from '../../../constants/app_info';
import {
  AVARTAR_DEFAULT_CUSTOMER,
  AVARTAR_DEFAULT_STAFF,
} from '../../../constants/icons';
import {IAuthState} from '../../../modules/auth/model';
import {RootState} from '../../../redux/reducers';
import {EDIT_PROFILE_SCREEN} from '../../../constants/screen_key';
import {Staff} from '../../../modules/user/model';

const ProfileScreen = () => {
  const currentUser = useSelector<RootState, IAuthState>(
    state => state.auth,
  ).userData;
  
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={styles.textPersonal}>Thông tin cá nhân</Text>
        }
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
    );
  };

  const renderAvatar = () => (
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
  );

  const renderButtonFeature = (name: string, info: string) => (
    <View style={styles.showInfo}>
      <Text style={[globalStyle.fontText, styles.label]}>{name}</Text>
      <Text style={[globalStyle.fontText, styles.info]}>{info}</Text>
    </View>
  );
  const renderInformation = () => (
    <View>
      {renderButtonFeature(
        'Họ và tên:',
        currentUser.firstname + ' ' + currentUser.lastname,
      )}
      {renderButtonFeature('Ngày sinh:', currentUser.birthday)}
      {renderButtonFeature('Địa chỉ:', currentUser.address)}
      {renderButtonFeature('Email:', currentUser.email)}
      {currentUser.typeAccount != 'Customer'
        ? renderButtonFeature(
            'Ngày vào làm:',
            (currentUser as Staff).timeStartWork,
          )
        : null}
      {currentUser.typeAccount != 'Customer'
        ? renderButtonFeature(
            'Nơi làm việc:',
            (currentUser as Staff).workPlace.branchName,
          )
        : null}
    </View>
  );
  const renderButton = () => (
    <TouchableOpacity
      style={styles.buttonEdit}
      onPress={() => NavigationActionService.navigate(EDIT_PROFILE_SCREEN)}>
      <Text style={styles.textEdit}>Chỉnh sửa</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={globalStyle.container}>
        {APP_TYPE != 'Admin' ? renderHeader() : null}
        {renderAvatar()}
        {renderInformation()}
        {renderButton()}
      </View>
    </>
  );
};

export default ProfileScreen;
