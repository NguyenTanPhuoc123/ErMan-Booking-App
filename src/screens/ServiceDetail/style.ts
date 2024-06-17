import {StyleSheet} from 'react-native';
import { InriaSerifBold } from '../../constants/font';
import { HEIGHT, WITDH } from '../../constants/styles';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  titleHeader:{
    fontSize:24,
    fontFamily:InriaSerifBold
  },
  img:{
    width:WITDH,
    height:HEIGHT/3 - 50,
    borderBottomEndRadius:25,
    borderBottomStartRadius:25
  },
  serviceName:{
    margin:20,
    fontSize:28,
    fontFamily:InriaSerifBold,
    textAlign:'center'
  },
  price:{
    fontSize:28,
    color:'#F3CC67',
    fontFamily:InriaSerifBold,
    marginHorizontal:20,
    marginBottom:20
  },
  containerDescription:{
    height:HEIGHT/2,
    width:WITDH,
    backgroundColor:'#474444',
    borderTopStartRadius:25,
    borderTopEndRadius:25
  },
  titleDescription:{
    margin:10,
    fontSize:24,
    fontFamily:InriaSerifBold,
    color:'#D4D3D6'
  },
  description:{
    fontSize:16,
    textAlign:'justify',
    marginHorizontal:10,
  },
  btnBookingNow:{
    backgroundColor:'#6740A5',
    width:WITDH/2,
    height:55,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },
  contentBtn:{
    fontSize:20,
    fontFamily:InriaSerifBold,
    color:'#fff'
  }
});

export default styles;
