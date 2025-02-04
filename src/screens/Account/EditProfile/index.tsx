import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import styles from './style';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import {APP_TYPE} from '../../../constants/app_info';
import {
  AVARTAR_DEFAULT_CUSTOMER,
  AVARTAR_DEFAULT_STAFF,
} from '../../../constants/icons';
import useEditProfile from './useEditProfile';
import globalStyle from '../../../constants/styles';
import {Controller} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { formatStringDate } from '../../../utils/date';

const EditProfileScreen = () => {
  const {
    goBack,
    control,
    errors,
    firstnameRef,
    onFocusFirstname,
    lastnameRef,
    onFocusLastname,
    open,
    openPicker,
    closePicker,
    addressRef,
    onFocusAddress,
    onUploadAvatar,
    avatar,
    onEditSubmit,
  } = useEditProfile();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={styles.titleHeader}>Chỉnh sửa thông tin</Text>
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
  const renderAvatar = () => (
    <View>
      <FastImage
        style={styles.avatar}
        resizeMode="cover"
        source={
          avatar
            ? {uri: avatar}
            : APP_TYPE === 'Customer'
            ? AVARTAR_DEFAULT_CUSTOMER
            : AVARTAR_DEFAULT_STAFF
        }
      />
      <TouchableOpacity style={styles.uploadImg} onPress={onUploadAvatar}>
        <Icon name="camera" solid size={20} color="#D4D3D6" />
      </TouchableOpacity>
    </View>
  );

  const renderButtonEdit = () => {
    return (
      <TouchableOpacity style={styles.btnEdit} onPress={onEditSubmit}>
        <Text style={styles.contentBtn}>Xác nhận</Text>
      </TouchableOpacity>
    );
  };

  const renderEditInfo = (label: string, info: JSX.Element) => (
    <View style={styles.infoContainer}>
      <Text style={[globalStyle.fontText, styles.label]}>{label}:</Text>
      {info}
    </View>
  );

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      {renderAvatar()}
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            {renderEditInfo(
              'Họ',
              <Controller
                control={control}
                name="firstname"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={firstnameRef}
                    style={[globalStyle.fontText, styles.input]}
                    value={value}
                    underlineColorAndroid="#D4D3D6"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={onFocusFirstname}
                  />
                )}
              />,
            )}
            <Text style={[globalStyle.fontText, styles.txtError]}>
              {errors.firstname?.message}
            </Text>
            {renderEditInfo(
              'Tên',
              <Controller
                control={control}
                name="lastname"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={lastnameRef}
                    style={[globalStyle.fontText, styles.input]}
                    value={value}
                    underlineColorAndroid="#D4D3D6"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={onFocusLastname}
                  />
                )}
              />,
            )}
            <Text style={[globalStyle.fontText, styles.txtError]}>
              {errors.lastname?.message}
            </Text>
            {renderEditInfo(
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
            <Text style={[globalStyle.fontText, styles.txtError]}>
            {errors.address?.message}
          </Text>
            {renderButtonEdit()}
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
