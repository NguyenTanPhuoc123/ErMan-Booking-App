import {ActivityIndicator, Image, Text, View} from 'react-native';
import styles from './style';
import React from 'react';
import {LANDiNG_PAGE} from '../../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import { LOGIN_SCREEN } from '../../../constants/screen_key';
import globalStyle from '../../../constants/styles';
import { APP_NAME } from '../../../constants/app_info';
import { selectState } from '../../../redux/reducers';


const LandingPage = () => {
  const navigation = useNavigation();
  const {isConnected} = selectState(state=>state.network);
  setTimeout(() => {
    navigation.navigate(LOGIN_SCREEN as never);
    console.log("Connected: ",isConnected);
    
  }, 3000);
  return (
    <View style={globalStyle.container}>
      <View>
        <Image
          style={styles.landingImage}
          source={LANDiNG_PAGE}
          resizeMode="cover"
        />
        <Text style={styles.title}>{APP_NAME}</Text>
      </View>
      <ActivityIndicator color="#D4D3D6" size="large" />
      <Text style={styles.subtitle}>Nâng tầm phong cách phái mạnh</Text>
    </View>
  );
};

export default LandingPage;
