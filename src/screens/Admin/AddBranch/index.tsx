import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TextInput,
} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle from '../../../constants/styles';
import {Header} from 'react-native-elements';
import useAddBranch from './useAddBranch';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {BRANCH} from '../../../constants/icons';
import TimePicker from 'react-native-date-picker';
import moment from 'moment';

const AddBranchScreen = () => {
  const {
    goBack,
    branch,
    control,
    branchNameRef,
    addressRef,
    descriptionRef,
    onFocusBranchName,
    onFocusAddress,
    onFocusDesciption,
    errors,
    image,
    onUploadImage,
    createBranch,
    open,
    openPicker,
    closePicker,
    confirmDelete
  } = useAddBranch();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={styles.titleHeader}>
            {branch ? 'Chỉnh sửa thông tin' : 'Thêm chi nhánh'}
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
          !branch ? (
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

  const renderImage = () => {
    return (
      <View>
        <FastImage
          style={styles.img}
          source={image ? {uri: image} : BRANCH}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.btnUpload} onPress={onUploadImage}>
          <Text style={styles.contentBtnUpload}>Chọn ảnh</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEditInfo = (label: string, info: JSX.Element) => (
    <View style={styles.infoContainer}>
      <Text style={[globalStyle.fontText, styles.label]}>{label}:</Text>
      {info}
    </View>
  );
  const renderBody = () => (
    <ScrollView
      nestedScrollEnabled
      onScrollBeginDrag={() => Keyboard.dismiss()}>
      {renderImage()}
      {renderEditInfo(
        'Tên chi nhánh',
        <Controller
          control={control}
          name="branchName"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              ref={branchNameRef}
              style={[globalStyle.fontText, styles.input]}
              value={value}
              underlineColorAndroid="#D4D3D6"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={onFocusBranchName}
            />
          )}
        />,
      )}
      <Text style={[globalStyle.fontText, styles.txtError]}>
        {errors.branchName?.message}
      </Text>
      {renderEditInfo(
        'Địa chỉ',
        <Controller
          control={control}
          name="address"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              ref={addressRef}
              style={[globalStyle.fontText, styles.input]}
              value={value.toString()}
              underlineColorAndroid="#D4D3D6"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChange}
              multiline
              onBlur={onBlur}
              onSubmitEditing={onFocusAddress}
            />
          )}
        />,
      )}
      <Text style={[globalStyle.fontText, styles.txtError]}>
        {errors.address?.message}
      </Text>
      {renderEditInfo(
        'Giờ mở cửa',
        <Controller
          control={control}
          name="openTime"
          render={({field: {value, onChange}}) => (
            <View style={styles.timeContainer}>
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
                  size={24}
                />
              </TouchableOpacity>
              <TimePicker
                date={new Date()}
                mode="time"
                modal
                title="Chọn giờ mở cửa"
                buttonColor="black"
                confirmText="Xác nhận"
                cancelText="Hủy"
                dividerColor="#000000"
                onConfirm={date => {
                  onChange(moment(date).format('HH:mm'));
                  closePicker();
                }}
                onCancel={() => closePicker()}
                open={open}
              />
            </View>
          )}
        />,
      )}
      {renderEditInfo(
        'Giờ đóng cửa',
        <Controller
          control={control}
          name="closeTime"
          render={({field: {value, onChange}}) => (
            <View style={styles.timeContainer}>
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
                  size={24}
                />
              </TouchableOpacity>
              <TimePicker
                date={new Date()}
                mode="time"
                modal
                title="Chọn giờ đóng cửa"
                buttonColor="black"
                confirmText="Xác nhận"
                cancelText="Hủy"
                dividerColor="#000000"
                onConfirm={date => {
                  onChange(moment(date).format('HH:mm'));
                  closePicker();
                }}
                onCancel={() => closePicker()}
                open={open}
              />
            </View>
          )}
        />,
      )}
      {renderEditInfo(
        'Mô tả',
        <Controller
          control={control}
          name="description"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              ref={descriptionRef}
              style={[globalStyle.fontText, styles.input]}
              value={value}
              underlineColorAndroid="#D4D3D6"
              autoCapitalize="none"
              autoCorrect={false}
              multiline
              onChangeText={onChange}
              onBlur={onBlur}
              onSubmitEditing={onFocusDesciption}
            />
          )}
        />,
      )}
      <TouchableOpacity style={styles.btnAdd} onPress={createBranch}>
        <Text style={styles.contentBtnAdd}>
          {branch ? 'Thay đổi' : ' Thêm chi nhánh'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      {renderBody()}
    </View>
  );
};

export default AddBranchScreen;
