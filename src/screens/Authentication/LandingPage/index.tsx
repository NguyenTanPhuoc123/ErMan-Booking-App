import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import {LANDING_PAGE} from '../../../constants/icons';
import styles from './styles';
import globalStyle from '../../../constants/styles';
import NavigationActionService from '../../../navigation/navigation';
import {LOGIN_SCREEN, REGISTER_SCREEN} from '../../../constants/screen_key';
import {APP_TYPE} from '../../../constants/app_info';

const LandingPage = () => {
  return (
    <ImageBackground
      style={[globalStyle.flex1, styles.container]}
      source={LANDING_PAGE}
      resizeMode="cover">
      <Text style={styles.titlePage}>ERMAN SALON</Text>
      <Text style={[globalStyle.fontText, styles.textBooking]}>
        Booking App
      </Text>
      <Text style={styles.textShow}>
        Đặt lịch cắt tóc chuyên nghiệp, nhanh chóng, tiến lợi, hãy bắt đầu ngay
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => {
            NavigationActionService.navigate(LOGIN_SCREEN);
          }}>
          <Text style={styles.textLogin}>Đăng nhập</Text>
        </TouchableOpacity>
        {APP_TYPE === 'Customer' ? (
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => {
              NavigationActionService.navigate(REGISTER_SCREEN, {
                id: 'Register',
                title: 'Đăng ký',
              });
            }}>
            <Text style={styles.textRegister}>Đăng ký</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </ImageBackground>
  );
};

export default LandingPage;
