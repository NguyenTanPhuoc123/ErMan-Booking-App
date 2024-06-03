import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle from '../../../constants/styles';
import useVerifyPhone from './useVerifyPhone';
import InputCodeOTP from '../../../component/InputCodeOTP';

const VerifyPhoneScreen = () => {
  const {goBack, otpCode, setOtpCode, expiredTime, resendOTP, disableResend} =
    useVerifyPhone();

  const CustomLeftHeader = () => {
    return (
      <TouchableOpacity onPress={goBack}>
        <Icon size={25} style={globalStyle.fontText} name="arrow-left" />
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <Header
        leftComponent={<CustomLeftHeader />}
        containerStyle={styles.containerHeader}
      />
    );
  };

  return (
    <>
      {renderHeader()}
      <View style={[globalStyle.containerForm, {justifyContent: 'flex-start'}]}>
        <Text style={styles.title}>Xác thực OTP</Text>
        <Text style={[globalStyle.fontText, styles.subtitle]}>
          Hãy nhập mã xác thực vào vị trí bên dưới, chúng tôi đã gửi nó đến bạn
          qua số điện thoại đã đăng ký
        </Text>
        <InputCodeOTP valueCode={otpCode} onChange={setOtpCode} />
        <View style={styles.lineResendOtp}>
          <Text style={[globalStyle.fontText]}>Chưa nhận được OTP?</Text>
          <TouchableOpacity disabled={disableResend} onPress={resendOTP}>
            <Text
              style={[
                globalStyle.fontText,
                disableResend ? styles.resendOtpDisable : styles.resendOtp,
              ]}>
              Gửi lại
            </Text>
          </TouchableOpacity>
          {expiredTime > 0 ? (
            <Text style={[globalStyle.fontText]}>{expiredTime} giây</Text>
          ) : (
            <></>
          )}
        </View>
        <TouchableOpacity style={styles.btnConfirm}>
          <Text style={[globalStyle.fontText, styles.contentBtnConfirm]}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default VerifyPhoneScreen;
