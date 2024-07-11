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
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
const RegisterScreen = () => {
  const {
    emailRef,
    control,
    errors,
    onFocusEmail,
    id,
    title,
    onRegister,
    goBack,
  } = useRegister();

  const CustomLeftHeader = () => {
    return (
      <TouchableOpacity onPress={goBack}>
        <Icon size={25} color="#D4D3D6" name="arrow-left" />
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <Header
        leftComponent={<CustomLeftHeader />}
        containerStyle={styles.containerHeader}
        backgroundColor="#282828"
      />
    );
  };

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
      <>
      {id != 'Register' ? renderHeader() : null}
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

        <TouchableOpacity style={styles.buttonContainer} onPress={onRegister}>
          <Text style={[globalStyle.fontText, styles.buttonLabel]}>
            Xác nhận
          </Text>
        </TouchableOpacity>
        {renderLogin()}
      </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
