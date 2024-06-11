import {StyleSheet} from 'react-native';
import {WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titlePage: {
    fontSize: 32,
    color: '#fff',
    fontWeight:  'bold',
    width: WITDH - 100,
    textAlign: 'center',
    marginTop:30,
    fontFamily: 'InriaSerif-Bold',
    alignSelf:'center',

    
  },
  textBooking:{
    fontSize: 32,
    color:'#fff',
    fontWeight:'500',
    width:WITDH - 100,
    textAlign:"center",
    fontFamily:'InriaSerif-Bold',
    alignSelf:'center',
  },
  textShow:{
    color:'#fff',
    fontSize:32,
    marginVertical:180,
    marginHorizontal:80,
    textAlign:'center',
    //alignSelf:'center',
    justifyContent:'center',
    fontFamily:'InriaSerif-Bold',
  },
  buttonContainer:{
    paddingVertical:80,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonLogin: {
    marginVertical:10,
    backgroundColor: '#6740A5',
    alignItems: 'center',
    justifyContent: 'center',
    width: WITDH / 2,
    height: 60,
    borderRadius: 25,
  },
  buttonSignIn:{
    marginVertical:10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: WITDH / 2,
    height: 60,
    borderRadius: 25,
  },
  textLogin: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '400',
  },
  textSignIn: {
    color: 'black',
    fontSize: 32,
    fontWeight: '400',
  },
  buttonSignUp:{
    alignItems:'center',
    justifyContent:'center'
  }
 
 
 
 
});

export default styles;
