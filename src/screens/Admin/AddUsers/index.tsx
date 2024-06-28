import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import globalStyle from '../../../constants/styles';
import CustomDropDown from '../../../component/CustomDropdown';
import useAddUser, {data} from './useAddUser';
import {Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {APP_TYPE} from '../../../constants/app_info';
import {
  AVARTAR_DEFAULT_CUSTOMER,
  AVARTAR_DEFAULT_STAFF,
} from '../../../constants/icons';
import {RadioButton} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const AddUsersScreen = () => {
  const {
    control,
    errors,
    firstNameRef,
    lastNameRef,
    passwordRef,
    phoneRef,
    addressRef,
    onFocusAddress,
    onFocusFirstName,
    onFocusLastName,
    onFocusPassword,
    onFocusPhone,
    user,
    createNewUser,
    formatStringDate,
    openPicker,
    closePicker,
    goBack,
    open,
    onUploadAvatar
  } = useAddUser();

  const renderAvatar = () =>
    !user ? null : (
      <>
      <FastImage
        style={styles.avatar}
        resizeMode="cover"
        source={
          user.avatar
            ? {uri: user.avatar}
            : APP_TYPE === 'Customer'
            ? AVARTAR_DEFAULT_CUSTOMER
            : AVARTAR_DEFAULT_STAFF
        }
      />
      <TouchableOpacity style={styles.uploadImg} onPress={onUploadAvatar}>
        <Icon name="camera" solid size={20} color="#D4D3D6" />
      </TouchableOpacity>
      </>
    );

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={styles.titleHeader}>
            {user ? 'Chỉnh sửa thông tin' : 'Thêm tài khoản'}
          </Text>
        }
        leftComponent={
          <TouchableOpacity onPress={goBack}>
            <Icon
              name="arrow-left"
              size={25}
              style={globalStyle.fontText}
              solid
            />
          </TouchableOpacity>
        }
      />
    );
  };

  const renderDropdown = () => (
    <Controller
      control={control}
      name="typeAccount"
      render={({field: {onChange, value}}) => (
        <CustomDropDown
          placeholder="Loại tài khoản"
          data={data}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );

  const renderButtonAdd = () => {
    return (
      <TouchableOpacity style={styles.containerButton} onPress={createNewUser}>
        <Text style={styles.textButton}>
          {user ? 'Thay đổi' : 'Thêm tài khoản'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEditInfo = (label: string, info: JSX.Element) => (
    <View style={styles.infoContainer}>
      <Text style={[globalStyle.fontText, styles.label]}>{label}:</Text>
      {info}
    </View>
  );

  const renderInputInfo = () => (
    <>
      {renderEditInfo(
        'Họ',
        <Controller
          control={control}
          name="firstname"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              ref={firstNameRef}
              style={[globalStyle.fontText, styles.input]}
              value={value}
              underlineColorAndroid="#D4D3D6"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={onFocusFirstName}
            />
          )}
        />,
      )}
      {renderEditInfo(
        'Tên',
        <Controller
          control={control}
          name="lastname"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              ref={lastNameRef}
              style={[globalStyle.fontText, styles.input]}
              value={value}
              underlineColorAndroid="#D4D3D6"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={onFocusLastName}
            />
          )}
        />,
      )}
      {renderEditInfo(
        'Số điện thoại',
        <Controller
          control={control}
          name="phone"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              ref={phoneRef}
              style={[globalStyle.fontText, styles.input]}
              value={value}
              underlineColorAndroid="#D4D3D6"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={onFocusPhone}
            />
          )}
        />,
      )}
      {! user ? null:renderEditInfo(
        'Giới tính',
        <Controller
          control={control}
          name="gender"
          render={({field: {onChange, value}}) => (
            <View style={styles.gender}>
              <Text style={[globalStyle.fontText, styles.labelGender]}>
                Nam
              </Text>
              <RadioButton
                color="#D4D3D6"
                value={value.toString()}
                status={value === true ? 'checked' : 'unchecked'}
                onPress={() => onChange(true)}
              />
              <Text style={[globalStyle.fontText, styles.labelGender]}>Nữ</Text>
              <RadioButton
                color="#D4D3D6"
                value="value.toString()"
                status={value === false ? 'checked' : 'unchecked'}
                onPress={() => onChange(false)}
              />
            </View>
          )}
        />,
      )}
      {!user
        ? null
        : renderEditInfo(
            'Ngày sinh',
            <Controller
              control={control}
              name="birthday"
              render={({field: {value, onChange}}) => (
                <>
                  <TextInput
                    style={[globalStyle.fontText, styles.input]}
                    value={value}
                    editable={false}
                    selectTextOnFocus={false}
                    underlineColorAndroid="#D4D3D6"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity onPress={() => openPicker()}>
                    <Icon
                      name="calendar-alt"
                      style={globalStyle.fontText}
                      size={20}
                    />
                  </TouchableOpacity>
                  <DatePicker
                    date={new Date(formatStringDate(value))}
                    mode="date"
                    modal
                    title="Chọn ngày sinh"
                    buttonColor="black"
                    confirmText="Xác nhận"
                    cancelText="Hủy"
                    dividerColor="#000000"
                    onConfirm={date => {
                      onChange(moment(date).format('DD-MM-YYYY'));
                      closePicker();
                    }}
                    onCancel={() => closePicker()}
                    open={open}
                  />
                </>
              )}
            />,
          )}
      {user
        ? null
        : renderEditInfo(
            'Mật khẩu',
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  ref={passwordRef}
                  style={[globalStyle.fontText, styles.input]}
                  value={value}
                  underlineColorAndroid="#D4D3D6"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={onFocusPassword}
                />
              )}
            />,
          )}
          {renderEditInfo(
              'Địa chỉ',
              <Controller
                control={control}
                name="address"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={addressRef}
                    multiline
                    style={[globalStyle.fontText, styles.input]}
                    value={value}
                    underlineColorAndroid="#D4D3D6"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={onFocusAddress}
                  />
                )}
              />,
            )}
    </>
  );

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            {renderAvatar()}
            {renderInputInfo()}
            {renderEditInfo('Loại tài khoản', renderDropdown())}
            {renderButtonAdd()}
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default AddUsersScreen;
