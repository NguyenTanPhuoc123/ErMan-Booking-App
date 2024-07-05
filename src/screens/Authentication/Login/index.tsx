import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {Controller} from 'react-hook-form';
import useSignIn from './useSignIn';
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle from '../../../constants/styles';
import {APP_TYPE} from '../../../constants/app_info';

const LoginScreen = () => {
  const {
    emailRef,
    control,
    onLogin,
    passwordRef,
    errors,
    isSecureEntry,
    setIsSecureEntry,
    onFocusEmail,
    onFocusPassword,
    goToRegister,
    goToForgotPassword,
  } = useSignIn();
  
  const renderRegister = () => {
    if (APP_TYPE === 'Customer') {
      return (
        <View style={styles.containerSignUp}>
          <Text style={globalStyle.fontText}>Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={goToRegister}>
            <Text style={[globalStyle.fontText, styles.signUp]}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <></>;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyle.containerForm}>
        <Text style={[globalStyle.fontText, styles.title]}>Đăng nhập</Text>
        <Text style={[globalStyle.fontText, styles.label]}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({field: {onBlur, onChange, value}}) => (
            <TextInput
              ref={emailRef}
              style={[globalStyle.fontText, styles.textInput]}
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={onChange}
              returnKeyType="next"
              value={value}
              placeholder="Nhập email..."
              onSubmitEditing={onFocusEmail}
            />
          )}
        />
        <Text style={[globalStyle.fontText, styles.txtError]}>
          {errors.email?.message}
        </Text>
        <Text style={[globalStyle.fontText, styles.label]}>Mật khẩu</Text>
        <Controller
          control={control}
          name="password"
          render={({field: {onBlur, onChange, value}}) => (
            <View>
              <TextInput
                ref={passwordRef}
                style={[globalStyle.fontText, styles.textInput]}
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                returnKeyType="done"
                value={value}
                secureTextEntry={isSecureEntry}
                placeholder="Nhập mật khẩu..."
                onSubmitEditing={onFocusPassword}
              />
              <TouchableOpacity
                style={styles.iconEye}
                onPress={() => setIsSecureEntry(!isSecureEntry)}>
                <Icon name={!isSecureEntry ? 'eye-slash' : 'eye'} size={20} />
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={[globalStyle.fontText, styles.txtError]}>
          {errors.password?.message}
        </Text>
        <TouchableOpacity
          style={styles.btnForgotPassword}
          onPress={goToForgotPassword}>
          <Text style={[globalStyle.fontText, styles.forgotPassword]}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={onLogin}>
          <Text style={[globalStyle.fontText, styles.buttonLabel]}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        {renderRegister()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
