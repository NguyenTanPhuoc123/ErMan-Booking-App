import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH - 30,
    height: 200,
    borderRadius:30,
    padding:10
  },
  imgStyle:{
    borderRadius:25,
  },
  title: {
    fontFamily: InriaSerifBold,
    fontSize: 20,
    margin: 7,
  },
  containerDiscount:{
    backgroundColor:'#8E8C92',
    width:100,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    right:20,
    top:10,
    borderStyle:'dashed',
    borderRadius:8,
    borderColor:'#EEB156',
    borderWidth:1
  },
  textCodeDiscount:{
    fontSize:16,
    fontFamily: InriaSerifBold
  },
  contentSale:{
    color:'#fff',
    fontSize:18,
    textAlign:'center',
    alignSelf:'center',
    marginTop:12,
    width:'65%'
  },
  discount:{
    fontFamily: InriaSerifBold,
    fontSize:26,
    alignSelf:'center',
    marginTop:10
  }
});

export default styles;
