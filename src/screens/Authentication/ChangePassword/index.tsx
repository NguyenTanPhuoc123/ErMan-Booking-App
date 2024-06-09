import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import globalStyle from '../../../constants/styles';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useChangePassword from './useChangePassword';
import {Header} from 'react-native-elements';
import styles from './styles';

const ChangePasswordScreen = () => {
  const {
    passwordRef,
    confirmPasswordRef,
    onFocusPassword,
    onFocusConfirmPassword,
    goBack,
    control,
    errors,
    isSecureEntry,
    isSecureEntryConfirm,
    setIsSecureEntry,
    setIsSecureEntryConfirm,
    onChangePassword,
  } = useChangePassword();

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        {renderHeader()}
        <View style={[globalStyle.containerForm]}>
          <Text style={[globalStyle.fontText, styles.title]}>
            Tạo mật khẩu mới
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
          <Text style={[globalStyle.fontText, styles.label]}>
            Nhập lại mật khẩu
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({field: {onBlur, onChange, value}}) => (
              <View>
                <TextInput
                  ref={confirmPasswordRef}
                  style={[globalStyle.fontText, styles.textInput]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  returnKeyType="done"
                  value={value}
                  secureTextEntry={isSecureEntry}
                  placeholder="Nhập mật khẩu..."
                  onSubmitEditing={onFocusConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.iconEye}
                  onPress={() =>
                    setIsSecureEntryConfirm(!isSecureEntryConfirm)
                  }>
                  <Icon
                    name={!isSecureEntryConfirm ? 'eye-slash' : 'eye'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={[globalStyle.fontText, styles.txtError]}>
            {errors.password?.message}
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onChangePassword}>
            <Text style={[globalStyle.fontText, styles.buttonLabel]}>
              Tạo mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordScreen;
