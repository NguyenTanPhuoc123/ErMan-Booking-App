import {StyleSheet} from 'react-native';
import { InriaSerifBold, InriaSerifRegular } from '../../constants/font';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  titleHeader: {
    fontSize: 22,
    fontFamily: InriaSerifBold,
  },
  label:{
    fontSize:20,
    fontFamily:InriaSerifBold,
    color:'#d4d3d6',
    margin:20
  },
  input:{
    width:'90%',
    backgroundColor:'#fff',
    padding:10,
    height:120,
    alignSelf:'center',
    borderRadius:20,
    color:'#344334',
    fontFamily:InriaSerifRegular,
    fontSize:16
  },
  btn:{
    backgroundColor:'#FCB704',
    width:'70%',
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    height:60,
    marginTop:50,
    borderRadius:25
  },
  contentBtn:{
    fontSize:18,
    fontFamily:InriaSerifBold
  }
});

export default styles;
