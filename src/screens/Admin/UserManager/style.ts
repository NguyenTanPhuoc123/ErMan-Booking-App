import {StyleSheet} from 'react-native';
import { InriaSerifBold, InriaSerifRegular } from '../../../constants/font';
import { WITDH } from '../../../constants/styles';


const styles = StyleSheet.create({
  statusBar:{
    backgroundColor:'#F3B20A',
    borderRadius:3,
    height:5,
  },
  textTab :{
    color:'#fff',
    fontFamily:InriaSerifRegular,
    fontSize:18,
    textTransform:'none'
  },
  containerButton:{
    justifyContent:'center',
    alignItems:'center',
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:"yellow",
    position:'absolute',
    bottom:60,
    right:20,
    zIndex:99999
  },
  
});

export default styles;
