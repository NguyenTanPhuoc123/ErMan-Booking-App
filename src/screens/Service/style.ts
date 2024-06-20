import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';
import {InriaSerifBold} from '../../constants/font';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  textHeader: {
    fontSize: 22,
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
  buttonCategory: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonCategoryActive: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEB156',
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  txtBtnActive: {
    color: '#433F3F',
  },
});

export default styles;
