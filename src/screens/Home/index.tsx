import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import globalStyle from '../../constants/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../../modules/auth/model';
import {Header} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import styles from './style';
import {
  AVARTAR_DEFAULT_CUSTOMER,
  AVARTAR_DEFAULT_STAFF,
} from '../../constants/icons';
import {APP_TYPE} from '../../constants/app_info';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = () => {
  const currentUser = useSelector<RootState, IAuthState>(
    state => state.auth,
  ).userData;
  useEffect(() => {}, []);
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        leftComponent={
          <View style={styles.leftComponentHeader}>
            <FastImage
              style={styles.avatar}
              resizeMode="cover"
              source={
                currentUser.avatar
                  ? {uri: currentUser.avatar}
                  : APP_TYPE === 'Customer'
                  ? AVARTAR_DEFAULT_CUSTOMER
                  : AVARTAR_DEFAULT_STAFF
              }
            />
            <View>
              <Text style={styles.textHeader}>Xin chào,</Text>
              <Text style={styles.textHeader}>{currentUser.lastname}</Text>
            </View>
          </View>
        }
        rightContainerStyle={styles.rightComponentHeader}
        rightComponent={
          <TouchableOpacity>
            <View>
              <View style={styles.pointNotification}></View>
              <Icon name="bell" size={25} style={globalStyle.fontText} solid />
            </View>
          </TouchableOpacity>
        }
      />
    );
  };
  const renderSearch = () => {
    return (
      <View>
        <TextInput style={[globalStyle.fontText, styles.inputSearch]} />
        <TouchableOpacity style={styles.btnSearch}>
          <Icon name='search' style={[globalStyle.fontText]} size={20}/>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      {renderHeader()}
      <View style={globalStyle.container}>{renderSearch()}</View>
    </>
  );
};

export default HomeScreen;
