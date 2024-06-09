import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import globalStyle from '../../../constants/styles';
import styles from './style';
import {Controller} from 'react-hook-form';
import useInputInfo from './useInputInfo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Header} from 'react-native-elements';

const InformationScreen = () => {
  const {
    control,
    errors,
    firstNameRef,
    lastNameRef,
    passwordRef,
    confirmPasswordRef,
    onFocusFirstName,
    onFocusLastName,
    onFocusPassword,
    onFocusConfirmPassword,
    isSecureEntry,
    setIsSecureEntry,
    isSecureEntryConfirm,
    setIsSecureEntryConfirm,
    onRegister,
    goBack,
  } = useInputInfo();

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
        <View style={[globalStyle.container, styles.container]}>
          {renderHeader()}
          <ScrollView>
          <View style={[globalStyle.container, styles.container]}>
          <Text style={[globalStyle.fontText, styles.title]}>
            Thông tin cá nhân
          </Text>
          <Text style={[globalStyle.fontText, styles.label]}>Họ</Text>
          <Controller
            control={control}
            name="firstname"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                ref={firstNameRef}
                style={[globalStyle.fontText, styles.textInput]}
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                returnKeyType="next"
                value={value}
                placeholder="Nhập họ..."
                onSubmitEditing={onFocusFirstName}
              />
            )}
          />
          <Text style={[globalStyle.fontText, styles.txtError]}>
            {errors.firstname?.message}
          </Text>
          <Text style={[globalStyle.fontText, styles.label]}>Tên</Text>
          <Controller
            control={control}
            name="lastname"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                ref={lastNameRef}
                style={[globalStyle.fontText, styles.textInput]}
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={onBlur}
                onChangeText={onChange}
                returnKeyType="next"
                value={value}
                placeholder="Nhập tên..."
                onSubmitEditing={onFocusLastName}
              />
            )}
          />
          <Text style={[globalStyle.fontText, styles.txtError]}>
            {errors.lastname?.message}
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
          <TouchableOpacity style={styles.buttonContainer} onPress={onRegister}>
            <Text style={[globalStyle.fontText, styles.buttonLabel]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    
  );
};

export default InformationScreen;
