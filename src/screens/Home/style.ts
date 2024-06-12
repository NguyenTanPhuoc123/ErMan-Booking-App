import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  leftComponentHeader: {
    flexDirection: 'row',
    width: WITDH / 2,
  },
  textHeader: {
    fontSize: 18,
    marginHorizontal: 5,
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
  inputSearch: {
    alignSelf: 'center',
    width: WITDH - 30,
    backgroundColor: '#675B5B',
    padding: 10,
    height: 55,
    fontSize: 20,
    marginVertical: 20,
    borderRadius: 25,
  },
  btnSearch: {
    position: 'absolute',
    right: 30,
    top: 37,
    zIndex: 9999,
  },
});

export default styles;
