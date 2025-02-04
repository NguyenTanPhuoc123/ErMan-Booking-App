import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';
import { InriaSerifBold } from '../../constants/font';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  showavatar: {
    marginVertical: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textHeader: {
    fontSize: 22,
    marginTop: 15,
    alignSelf: 'flex-start',
    fontFamily: 'InriaSerif-Bold',
    color: '#D4D3D6',
  },
  popupbody:{
    justifyContent:'center',
    alignItems:'center'
  },
  bodyText:{
    fontSize: 18,
    fontFamily:InriaSerifBold,
    alignSelf:'flex-start'
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
  textAccount: {
    fontSize: 22,
    marginHorizontal: 5,
    fontFamily: 'InriaSerif-Bold',
    color: '#D4D3D6',
  },
  containerBody: {
    backgroundColor: '#433F3F',
    marginVertical: 50,
  },
  show: {
    flexDirection: 'row',
    padding: 15,
  },
  content: {
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 30,
  },
});

export default styles;
