import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import React from 'react';
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
import {formatStringDate} from '../../../utils/date';

const AddUsersScreen = () => {
  const {
    control,
    errors,
    firstNameRef,
    lastNameRef,
    passwordRef,
    emailRef,
    addressRef,
    onFocusAddress,
    onFocusFirstName,
    onFocusLastName,
    onFocusPassword,
    onFocusEmail,
    user,
    createNewUser,
    openPicker,
    closePicker,
    goBack,
    open,
    branchs,
    noedit,
    confirmDelete,
  } = useAddUser();

  const renderAvatar = () =>
    !user ? null : (
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
    );

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={styles.titleHeader}>
            {user
              ? user.typeAccount === 'Customer'
                ? 'Thông tin khách'
                : 'Chỉnh sửa thông tin'
              : 'Thêm tài khoản'}
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
        rightComponent={
          !user ? (
            <></>
          ) : (
            <TouchableOpacity onPress={confirmDelete}>
              <Icon
                name="trash-alt"
                size={25}
                style={globalStyle.fontText}
                solid
              />
            </TouchableOpacity>
          )
        }
      />
    );
  };

  const renderDropdown = () => (
    <Controller
      control={control}
      name="typeAccount"
      render={({field: {value, onChange}}) => (
        <CustomDropDown
          placeholder="Loại tài khoản"
          data={data}
          disable={user ? true : false}
          label="label"
          valueField="value"
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
  const renderDropdownWorkPlace = () => (
    <Controller
      control={control}
      name="workPlace"
      render={({field: {onChange, value}}) => (
        <CustomDropDown
          placeholder="Nơi làm việc"
          data={branchs}
          label="branchName"
          valueField="id"
          value={value}
          onChange={onChange}
        />
      )}
    />
  );

  const renderWorkStartTime = () => (
    <Controller
      control={control}
      name="timeStartWork"
      render={({field: {value, onChange}}) => (
        <>
          <TextInput
            style={[globalStyle.fontText, styles.inputworktime]}
            value={value}
            editable={false}
            selectTextOnFocus={false}
            underlineColorAndroid="#D4D3D6"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity disabled={!noedit} onPress={openPicker}>
            <Icon name="calendar-alt" style={globalStyle.fontText} size={25} />
          </TouchableOpacity>
          <DatePicker
            date={new Date(formatStringDate(value))}
            mode="date"
            modal
            title="Chọn ngày bắt đầu làm việc"
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
              editable={noedit}
              selectTextOnFocus={noedit}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={onFocusFirstName}
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
              ref={lastNameRef}
              style={[globalStyle.fontText, styles.input]}
              value={value}
              underlineColorAndroid="#D4D3D6"
              autoCapitalize="none"
              autoCorrect={false}
              editable={noedit}
              selectTextOnFocus={noedit}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={onFocusLastName}
            />
          )}
        />,
      )}
      <Text style={[globalStyle.fontText, styles.txtError]}>
        {errors.lastname?.message}
      </Text>
      {renderEditInfo(
        'Email',
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              ref={emailRef}
              style={[globalStyle.fontText, styles.input]}
              value={value}
              underlineColorAndroid="#D4D3D6"
              autoCapitalize="none"
              autoCorrect={false}
              editable={noedit}
              selectTextOnFocus={noedit}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={onFocusEmail}
            />
          )}
        />,
      )}
      <Text style={[globalStyle.fontText, styles.txtError]}>
        {errors.email?.message}
      </Text>
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
                  <TouchableOpacity
                    disabled={!noedit}
                    onPress={() => openPicker()}>
                    <Icon
                      name="calendar-alt"
                      style={globalStyle.fontText}
                      size={25}
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
      <Text style={[globalStyle.fontText, styles.txtError]}>
        {errors.email?.message}
      </Text>
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
              editable={noedit}
              selectTextOnFocus={noedit}
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
      <ScrollView onScrollBeginDrag={() => Keyboard.dismiss()}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            {renderAvatar()}
            {renderInputInfo()}
            {!user
              ? [
                  renderEditInfo('Loại tài khoản', renderDropdown()),
                  renderEditInfo('Nơi làm việc', renderDropdownWorkPlace()),
                  renderEditInfo('Ngày vào làm ', renderWorkStartTime()),
                ]
              : user && user.typeAccount != 'Customer'
              ? [
                  renderEditInfo('Loại tài khoản', renderDropdown()),
                  renderEditInfo('Nơi làm việc', renderDropdownWorkPlace()),
                  renderEditInfo('Ngày vào làm ', renderWorkStartTime()),
                ]
              : null}
            {user && user.typeAccount === 'Customer' ? null : renderButtonAdd()}
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default AddUsersScreen;
