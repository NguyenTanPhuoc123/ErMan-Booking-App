import {ActivityIndicator, Image, Text, View} from 'react-native';
import styles from './styles';
import React from 'react';
import {LANDiNG_PAGE} from '../../../constants/icons';
import { LOGIN_SCREEN } from '../../../constants/screen_key';
import globalStyle from '../../../constants/styles';
import { APP_NAME } from '../../../constants/app_info';
import { selectState } from '../../../redux/reducers';
import NavigationActionService from '../../../navigation/navigation';


const LandingPage = () => {
  const {isConnected} = selectState(state=>state.network);
  setTimeout(() => {
    console.log("Connected: ",isConnected);
    NavigationActionService.navigate(LOGIN_SCREEN);
    
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
