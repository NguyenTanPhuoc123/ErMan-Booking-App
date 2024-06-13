import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
  },
  showavatar:{
   marginVertical:20,
    alignItems:'center',

  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textHeader: {
    fontSize: 30,
    //marginVertical:15,
    marginTop:15,
    alignSelf: 'flex-start',
    fontFamily: 'InriaSerif-Bold',
    color: '#D4D3D6',
  },
  rightComponentHeader: {
    width: WITDH / 2,
    justifyContent: 'center',
  },
  pointNotification: {
    backgroundColor: '#E24747',
    width: 8,
    height: 8,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },
  textTaiKhoan:{
    fontSize: 30,
    marginHorizontal: 5,
    fontFamily: 'InriaSerif-Bold',
    color: '#D4D3D6',
  },
  containerBody:{
    flex:2,
    backgroundColor:'#433F3F',
    marginVertical:50,
  },
  showuser:{
   flexDirection:'row',
   marginHorizontal:15,
   marginVertical:15,
  },
  textUser:{
    fontSize:30,
    alignSelf:'center',
    marginLeft:30,
  }
  
 
});

export default styles;
