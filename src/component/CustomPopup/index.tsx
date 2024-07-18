import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {MessageType, PopupProps, PopupType} from './type';
import NavigationActionService from '../../navigation/navigation';
import globalStyle from '../../constants/styles';
import styles from './styles';

const CustomPopup = () => {
  const route = useRoute();

  const {
    title,
    message,
    children,
    horizontalBtn = false,
    onClosePopup,
    ...otherProps
  } = route.params as PopupProps;

  const closePopup = () => {
    onClosePopup && onClosePopup();
    NavigationActionService.hidePopup();
  };

  const renderPrimaryButton = () => {
    return (
      <TouchableOpacity
        style={[
          otherProps.typeMessage === MessageType.COMMON
            ? globalStyle.bgBtnPopupCommon
            : globalStyle.bgBtnPopupError,
          styles.primaryBtn,
          styles.horizontalButton,
        ]}
        onPress={() => {
         otherProps.onPressPrimaryBtn && otherProps.onPressPrimaryBtn();
          closePopup();
        }}>
        <Text style={[globalStyle.fontText, styles.primaryText]}>OK</Text>
      </TouchableOpacity>
    );
  };

  const renderSecondaryButton = () => {
    if (otherProps.type !== PopupType.ONE_BUTTON) {
      return (
        <TouchableOpacity
          style={[
            otherProps.typeMessage === MessageType.COMMON
              ? globalStyle.bgBtnPopupCommon
              : globalStyle.bgBtnPopupError,
            styles.primaryBtn,
            styles.horizontalButton,
          ]}
          onPress={() => {
            closePopup();
          }}>
          <Text style={[globalStyle.fontText, styles.primaryText]}>Thoát</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderFooter = () => (
    <View style={[styles.footer, styles.footerHorizontal]}>
      {renderPrimaryButton()}
      {renderSecondaryButton()}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderBody = () => (
    <View style={styles.body}>
      {children ? (
        children
      ) : (
        <Text style={[globalStyle.fontText, styles.message]}>{message}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          otherProps.typeMessage === MessageType.COMMON
            ? globalStyle.bgPopupCommon
            : globalStyle.bgPopupError,
          styles.contentContainer,
        ]}>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </View>
    </View>
  );
};

export default React.memo(CustomPopup);
