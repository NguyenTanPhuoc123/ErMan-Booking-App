import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';
import { InriaSerifBold, InriaSerifRegular } from '../../constants/font';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  statusBar:{
    backgroundColor:'#F3B20A',
    borderRadius:3,
  },
  textactiveTab :{
    color:'#F3B20A',
    fontFamily:InriaSerifBold,
    fontSize:16,
  },
  textTab :{
    color:'#fff',
    fontFamily:InriaSerifRegular,
    fontSize:16,
  },
  textHeader: {
    fontSize: 22,
    marginTop: 15,
    alignSelf: 'flex-start',
    fontFamily: InriaSerifBold,
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
  textBooking: {
    fontSize: 22,
    marginHorizontal: 5,
    fontFamily: 'InriaSerif-Bold',
    color: '#D4D3D6',
  },
  containerSearch: {
    width: WITDH - 30,
    backgroundColor: '#675B5B',
    height: 55,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: 'center',
  },
  inputSearch: {
    backgroundColor: 'transparent',
    padding: 14,
    height: 55,
    fontSize: 20,
    borderRadius: 25,
    width: '87%',
    alignSelf: 'flex-start',
  },
  btnSearch: {
    position: 'absolute',
    right: 25,
    top: 18,
    zIndex: 9999,
  },
});

export default styles;
