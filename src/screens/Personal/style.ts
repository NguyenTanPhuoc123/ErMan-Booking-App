import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';
import { InriaSerifBold } from '../../constants/font';

const styles = StyleSheet.create({
  showHeader: {
    backgroundColor: '#282828',
  },
  containerHeader: {
    borderColor: '#433F3F',
  },
  showavatar: {
    marginVertical: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  containerBody: {
    flex:1, 
  },
  showName:{
    flexDirection:'row',
  },
  textName: {
    fontSize: 24,
    marginVertical:13,
    marginLeft:20,
    fontFamily: 'InriaSerif-Bold',
    color: '#fff',
  },
  textInfo:{
    fontSize: 24,
    marginVertical:15,
    marginLeft:"auto",
    width:'50%',
    fontFamily: 'InriaSerif-Bold',
    color: '#fff',
    flexWrap:'wrap',
  },
  leftComponentHeader: {
    width: WITDH / 2,
    justifyContent: 'center',
  },
  pointNotification: {
    width: 8,
    height: 8,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },
  textPersonal: {
    fontSize: 28,
    marginHorizontal: 5,
    fontFamily: 'InriaSerif-Bold',
    color: '#D4D3D6',
  },
  buttonContainer: {
    paddingVertical:100,
    alignItems: 'center',
  },
  buttonEdit: {
    marginVertical: 50,
    backgroundColor: '#6740A5',
    alignItems: 'center',
    justifyContent: 'center',
    width: WITDH - 150,
    height: 60,
    borderRadius: 25,
  },
  textEdit:{
    color: '#fff',
    fontSize: 30,
    fontFamily: 'InriaSerif-Bold',
  }
});

export default styles;
