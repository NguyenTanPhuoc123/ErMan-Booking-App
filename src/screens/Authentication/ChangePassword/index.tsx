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
    onFocusOldPassword,
    isSecureEntryOld,
    setIsSecureEntryOld,
    oldPasswordRef,
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
        backgroundColor="#282828"
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        {renderHeader()}
        <View style={[globalStyle.containerForm]}>
          <Text style={[globalStyle.fontText, styles.title]}>Đổi mật khẩu</Text>
          <Text style={[globalStyle.fontText, styles.label]}>Mật khẩu cũ</Text>
          <Controller
            control={control}
            name="oldPassword"
            render={({field: {onBlur, onChange, value}}) => (
              <View>
                <TextInput
                  ref={oldPasswordRef}
                  style={[globalStyle.fontText, styles.textInput]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  returnKeyType="done"
                  value={value}
                  secureTextEntry={isSecureEntryOld}
                  placeholder="Nhập mật khẩu..."
                  onSubmitEditing={onFocusOldPassword}
                />
                <TouchableOpacity
                  style={styles.iconEye}
                  onPress={() => setIsSecureEntryOld(!isSecureEntryOld)}>
                  <Icon
                    name={!isSecureEntryOld ? 'eye-slash' : 'eye'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={[globalStyle.fontText, styles.txtError]}>
            {errors.oldPassword?.message}
          </Text>

          <Text style={[globalStyle.fontText, styles.label]}>Mật khẩu mới</Text>
          <Controller
            control={control}
            name="newPassword"
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
            {errors.newPassword?.message}
          </Text>
          <Text style={[globalStyle.fontText, styles.label]}>
            Nhập lại mật khẩu mới
          </Text>
          <Controller
            control={control}
            name="confirmNewPassword"
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
                  secureTextEntry={isSecureEntryConfirm}
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
            {errors.confirmNewPassword?.message}
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onChangePassword}>
            <Text style={[globalStyle.fontText, styles.buttonLabel]}>
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordScreen;
