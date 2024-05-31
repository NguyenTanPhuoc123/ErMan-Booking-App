import {Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Controller} from 'react-hook-form';
import useSignIn from './useSignIn';
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle from '../../../constants/styles';
import { selectState } from '../../../redux/reducers';

const LoginScreen = () => {
  const {
    phoneRef,
    control,
    onLogin,
    passwordRef,
    onFocusPhone,
    onFocusPassword,
    handleSubmit,
  } = useSignIn();
  const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);
  const {isConnected} = selectState(state=>state.network);
  useEffect (()=>{
    if(!isConnected){
        Alert.alert('Network','No connection')
      
    }
  },[isConnected])

  return (
    <View style={[globalStyle.container, styles.container]}>
      <Text style={[globalStyle.fontText, styles.title]}>Đăng nhập</Text>
      <Text style={[globalStyle.fontText, styles.label]}>Số điện thoại</Text>
      <Controller
        control={control}
        name="phone"
        render={({field: {onBlur, onChange, value}}) => (
          <TextInput
            ref={phoneRef}
            style={[globalStyle.fontText, styles.textInput]}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="phone-pad"
            onBlur={onBlur}
            onChangeText={onChange}
            returnKeyType="next"
            value={value}
            onSubmitEditing={onFocusPhone}
            placeholder="Nhập số điện thoại..."
          />
        )}
      />
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
              onSubmitEditing={onFocusPassword}
              placeholder="Nhập mật khẩu..."
            />
            <TouchableOpacity
              style={styles.iconEye}
              onPress={() => setIsSecureEntry(!isSecureEntry)}>
              <Icon name={!isSecureEntry ? 'eye-slash' : 'eye'} size={20} />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.btnForgotPassword}>
        <Text style={[globalStyle.fontText, styles.forgotPassword]}>
          Quên mật khẩu?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSubmit(onLogin)}>
        <Text style={[globalStyle.fontText, styles.buttonLabel]}>Sign in</Text>
      </TouchableOpacity>
      <View style={styles.containerSignUp}>
        <Text style={globalStyle.fontText}>Chưa có tài khoản?</Text>
        <TouchableOpacity>
          <Text style={[globalStyle.fontText, styles.signUp]}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
