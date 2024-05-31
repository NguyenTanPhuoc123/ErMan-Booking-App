import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  LOGO_APP,
  SLIDE_WELCOME_1,
  SLIDE_WELCOME_2,
  SLIDE_WELCOME_3,
} from '../../../constants/icons';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {LOGIN_SCREEN} from '../../../constants/screen_key';
import {APP_NAME} from '../../../constants/app_info';
import Carousel from 'react-native-reanimated-carousel'
import { HEIGHT, WITDH } from '../../../constants/styles';
const data : WelcomeData[] = [
  {id:'1',content:'There are many traveling in all the World',image:SLIDE_WELCOME_1},
  {id:'2',content:'There are many traveling in all the World on one click!',image:SLIDE_WELCOME_2},
  {id:'3',content:'There are many traveling in all the World on one click!',image:SLIDE_WELCOME_3}
];

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [idx,setIdx] = useState(0);
  const handleNavigation = (index:number)=>{
    if(index===data.length-1){
      navigation.navigate(LOGIN_SCREEN as never);

    }
    else{
      setIdx(index);
      console.log(idx+1);
      
    }
  }
  const renderItem = ({item,index}:{item:WelcomeData,index:number})=>{
    return(
      <ImageBackground style={styles.container} source={item.image} resizeMode='cover'>
        <Image style={index===0?styles.logoPage1: styles.logoPageAfter} source={LOGO_APP}/>
        <Text style={index===0?styles.titlePage1: styles.titlePageAfter}>Welcome to {APP_NAME}!</Text>
        <Text style={index===0?styles.subtitlePage1: styles.subtitlePageAfter}>{item.content}</Text>
        <TouchableOpacity style={styles.btnContainer} onPress={()=>handleNavigation(index)}>
        {
          index===data.length-1?<Text style={styles.titleBtn}>GET STARTED</Text> :
           <View style={styles.next}>
            <Text style={styles.titleBtn}>NEXT</Text>
            <Icon style={styles.titleBtn} name='arrow-right' ></Icon>
           </View>
        }
        </TouchableOpacity>
      </ImageBackground>
    );
  }
  return (
      <Carousel<WelcomeData>
        data={data}
        renderItem={renderItem}
        width={WITDH}
        height={HEIGHT}
        loop={false}
        enabled={false}
        defaultIndex={0}
      />
    
  );
};

export default WelcomeScreen;
