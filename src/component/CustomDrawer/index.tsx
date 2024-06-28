import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../../modules/auth/model';
import globalStyle from '../../constants/styles';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {AVARTAR_DEFAULT_STAFF} from '../../constants/icons';
import FastImage from 'react-native-fast-image';
import styles from './style';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {userData} = useSelector<RootState, IAuthState>(state => state.auth);
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <FastImage
        source={
          !userData.avatar ? AVARTAR_DEFAULT_STAFF : {uri: userData.avatar}
        }
        style={styles.avatar}
        resizeMode="cover"
      />
      <Text style={styles.name}>{userData.firstname+' '+userData.lastname}</Text>
    </View>
  );
  return (
    <View style={globalStyle.flex1}>
    {renderHeader()}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
