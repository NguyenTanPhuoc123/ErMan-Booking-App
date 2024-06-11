import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';
import {LANDING_PAGE1} from '../../../constants/icons';
import styles from './styles';
import globalStyle from '../../../constants/styles';
import NavigationActionService from '../../../navigation/navigation';
import {LOGIN_SCREEN, REGISTER_SCREEN} from '../../../constants/screen_key';

const WelcomeScreen = () => {
  return (
    <ImageBackground
      style={globalStyle.flex1}
      source={LANDING_PAGE1}
      resizeMode="cover">
      <Text style={styles.titlePage}>ERMAN SALON</Text>
      <Text style={styles.textBooking}>Booking App</Text>
      <Text style={styles.textShow}>
        Đặt lịch cắt tóc ngay chỉ trong vài phút
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => {
            NavigationActionService.navigate(LOGIN_SCREEN);
          }}>
          <Text style={[globalStyle.fontText, styles.textLogin]}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSignIn}
          onPress={() => {
            NavigationActionService.navigate(REGISTER_SCREEN, {
              id: 'Register',
              title: 'Đăng ký',
            });
          }}>
          <Text style={[globalStyle.fontText, styles.textSignIn]}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonSignUp}></View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
