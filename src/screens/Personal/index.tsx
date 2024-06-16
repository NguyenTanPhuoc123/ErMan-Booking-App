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
            <TouchableOpacity onPress={() => {}}>
              <View>
                <View style={styles.pointNotification}></View>
                <Icon
                  name="arrow-left"
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
    </View>
  );
  const renderInformation = () => (
    <View style={styles.containerBody}>
      <View style={styles.showName}>
        <Text style={styles.textName}>Họ và tên:</Text>
        <Text style={styles.textInfo}>
          {currentUser.firstname + ' ' + currentUser.lastname}
        </Text>
      </View>
      <View style={styles.showName}>
        <Text style={styles.textName}>Giới tính: </Text>
        <Text style={styles.textInfo}> Nam</Text>
      </View>
      <View style={styles.showName}>
        <Text style={styles.textName}>Ngày sinh: </Text>
        <Text style={styles.textInfo}> 21/11/2003</Text>
      </View>
      <View style={styles.showName}>
        <Text style={styles.textName}>Địa chỉ: </Text>
        <Text style={styles.textInfo}> Đoàn Văn Bơ, quận 4, TP.HCM</Text>
      </View>
      <View style={styles.showName}>
        <Text style={styles.textName}>Số điện thoại: </Text>
        <Text style={styles.textInfo}>{currentUser.phone}</Text>
      </View>
    </View>
  );
  const renderButton = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonEdit}>
        <Text style={styles.textEdit}>Chỉnh sửa</Text>
      </TouchableOpacity>
    </View>
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
