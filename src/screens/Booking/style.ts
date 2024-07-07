import {Dimensions, StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';
import {InriaSerifBold, InriaSerifRegular} from '../../constants/font';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  statusBar: {
    backgroundColor: '#F3B20A',
    borderRadius: 3,
    height: 4,
    width: 60,
    alignSelf: 'center',
    marginLeft: WITDH * 0.05,
  },
  textTab: {
    color: '#fff',
    fontFamily: InriaSerifRegular,
    fontSize: 14,
    textTransform: 'none',
    textAlign: 'center',
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
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 99999,
  },
});

export default styles;
