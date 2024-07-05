import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './styles';
import globalStyle from '../../../constants/styles';
import NavigationActionService from '../../../navigation/navigation';
import {LOGIN_SCREEN} from '../../../constants/screen_key';
import useRegister from './useRegister';
import {Controller} from 'react-hook-form';
const RegisterScreen = () => {
  const {emailRef, control, errors, onFocusEmail, id, title, onRegister} =
    useRegister();
  const renderLogin = () => {
    return id === 'Register' ? (
      <View style={styles.containerSignIn}>
        <Text style={globalStyle.fontText}>Đã có tài khoản?</Text>
        <TouchableOpacity
          onPress={() => {
            NavigationActionService.navigate(LOGIN_SCREEN);
          }}>
          <Text style={[globalStyle.fontText, styles.signIn]}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <></>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyle.containerForm}>
        <Text style={[globalStyle.fontText, styles.title]}>{title}</Text>
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

        <TouchableOpacity style={styles.buttonContainer} 
          onPress={onRegister}
        >
          <Text style={[globalStyle.fontText, styles.buttonLabel]}>
            Gửi OTP
          </Text>
        </TouchableOpacity>
        {renderLogin()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
