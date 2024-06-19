import {StyleSheet} from 'react-native';
import {HEIGHT, WITDH} from '../../../constants/styles';
import {InriaSerifBold} from '../../../constants/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titlePage: {
    fontSize: 32,
    color: '#D4D3D6',
    marginTop: 20,
    fontFamily: InriaSerifBold,
    alignSelf: 'center',
  },
  textBooking: {
    fontSize: 28,
    fontWeight: '500',
    width: WITDH - 100,
    textAlign: 'center',
    fontFamily: InriaSerifBold,
    alignSelf: 'center',
  },
  textShow: {
    color: '#D4D3D6',
    fontSize: 24,
    width: WITDH - 150,
    marginTop: HEIGHT / 4,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: InriaSerifBold,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: HEIGHT / 16,
    alignItems: 'center',
  },
  buttonLogin: {
    marginVertical: 10,
    backgroundColor: '#EEB156',
    alignItems: 'center',
    justifyContent: 'center',
    width: WITDH - 100,
    height: 60,
    borderRadius: 25,
  },
  buttonRegister: {
    marginVertical: 10,
    backgroundColor: '#433F3F',
    alignItems: 'center',
    justifyContent: 'center',
    width: WITDH - 100,
    height: 60,
    borderRadius: 25,
  },
  textLogin: {
    color: '#433F3F',
    fontSize: 32,
    fontFamily: InriaSerifBold,
  },
  textRegister: {
    color: '#433F3F',
    fontSize: 32,
    fontWeight: '400',
    fontFamily: InriaSerifBold,
  },
});

export default styles;
