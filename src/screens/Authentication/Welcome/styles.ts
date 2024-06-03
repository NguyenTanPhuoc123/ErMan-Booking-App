import {StyleSheet} from 'react-native';
import { WITDH } from '../../../constants/styles';

const styles = StyleSheet.create({
  container:{
   flex:1,
   alignItems:'center',
   
  },
  logoPage1:{
    height:150,
    width:150,
    borderRadius:25,
    marginVertical:20
  },
  logoPageAfter:{
    height:100,
    width:100,
    borderRadius:20,
    alignSelf:'flex-start',
    margin:20
  },
  titlePage1: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '500',
    width: WITDH/2,
    alignSelf:'center'
  },
  subtitlePage1: {
    marginTop: 40,
    fontSize: 20,
    color: '#FBFAFA',
    fontWeight: '300',
    alignSelf:'center',
  },
  titlePageAfter: {
    marginHorizontal: 20,
    fontSize: 36,
    color: '#fff',
    fontWeight: '500',
    width: WITDH/1.75,
    alignSelf:'flex-start'
  },
  subtitlePageAfter: {
    marginTop: 40,
    marginHorizontal:20,
    fontSize: 24,
    color: '#FBFAFA',
    fontWeight: '300',
    alignSelf:'flex-start',
  },
  btnContainer: {
    alignSelf:'center',
    backgroundColor:'transparent',
    position:'absolute',
    bottom:100,
  },
  titleBtn: {
    color: '#FBFAFA',
    fontSize: 24,
    fontWeight: '500',
    padding:5
  },
  next:{
    flexDirection:'row',
    alignItems:'center'
  }
});

export default styles;
