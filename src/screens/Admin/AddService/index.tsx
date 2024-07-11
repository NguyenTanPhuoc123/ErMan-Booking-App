import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import React from 'react';
import globalStyle from '../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useAddService from './useAddService';
import styles from './style';
import {Header} from 'react-native-elements';
import {Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {IMAGE_SERVICE_DEFAULT} from '../../../constants/icons';

const AddServiceScreen = () => {
  const {
    goBack,
    control,
    errors,
    onFocusServiceName,
    onFocusPrice,
    onFocusDesciption,
    onFocusTime,
    serviceNameRef,
    priceRef,
    timeRef,
    descriptionRef,
    onUploadImage,
    image,
    addService,
    service,
    confirmDelete,
  } = useAddService();

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={styles.titleHeader}>
            {service ? 'Chỉnh sửa thông tin' : 'Thêm dịch vụ'}
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
          !service ? (
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

  const renderEditInfo = (label: string, info: JSX.Element) => (
    <View style={styles.infoContainer}>
      <Text style={[globalStyle.fontText, styles.label]}>{label}:</Text>
      {info}
    </View>
  );

  const renderImage = () => {
    return (
      <View>
        <FastImage
          style={styles.img}
          source={image ? {uri: image} : IMAGE_SERVICE_DEFAULT}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.btnUpload} onPress={onUploadImage}>
          <Text style={styles.contentBtnUpload}>Chọn ảnh</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <ScrollView
        nestedScrollEnabled
        onScrollBeginDrag={() => Keyboard.dismiss()}>
        {renderImage()}
        {renderEditInfo(
          'Tên dịch vụ',
          <Controller
            control={control}
            name="serviceName"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                ref={serviceNameRef}
                style={[globalStyle.fontText, styles.input]}
                value={value}
                underlineColorAndroid="#D4D3D6"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onChange}
                onBlur={onBlur}
                onSubmitEditing={onFocusServiceName}
              />
            )}
          />,
        )}
        <Text style={[globalStyle.fontText, styles.txtError]}>
          {errors.serviceName?.message}
        </Text>
        {renderEditInfo(
          'Thời gian thực hiện(Phút)',
          <Controller
            control={control}
            name="time"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                ref={timeRef}
                style={[globalStyle.fontText, styles.input]}
                value={value.toString()}
                keyboardType="number-pad"
                underlineColorAndroid="#D4D3D6"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onChange}
                onBlur={onBlur}
                onSubmitEditing={onFocusTime}
              />
            )}
          />,
        )}
        <Text style={[globalStyle.fontText, styles.txtError]}>
          {errors.time?.message}
        </Text>
        {renderEditInfo(
          'Giá(VNĐ)',
          <Controller
            control={control}
            name="price"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                ref={priceRef}
                style={[globalStyle.fontText, styles.input]}
                value={value.toString()}
                keyboardType="number-pad"
                underlineColorAndroid="#D4D3D6"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onChange}
                onBlur={onBlur}
                onSubmitEditing={onFocusPrice}
              />
            )}
          />,
        )}
        <Text style={[globalStyle.fontText, styles.txtError]}>
          {errors.price?.message}
        </Text>
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
        <TouchableOpacity style={styles.btnAdd} onPress={addService}>
          <Text style={styles.contentBtnAdd}>
            {service ? 'Thay đổi' : ' Thêm dịch vụ'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyle.container}>
        {renderHeader()}
        {renderBody()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddServiceScreen;
