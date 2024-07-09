import {StyleSheet} from 'react-native';
import {InriaSerifBold} from '../../constants/font';
import {HEIGHT, WITDH} from '../../constants/styles';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  titleHeader: {
    fontSize: 22,
    fontFamily: InriaSerifBold,
  },
  img: {
    width: WITDH,
    height: HEIGHT / 3 - 50,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  serviceName: {
    margin: 20,
    fontSize: 28,
    fontFamily: InriaSerifBold,
    textAlign: 'center',
  },
  time: {
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  price: {
    fontSize: 28,
    color: '#F3CC67',
    fontFamily: InriaSerifBold,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  containerDescription: {
    height: HEIGHT / 3 + 75,
    width: WITDH,
    backgroundColor: '#474444',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  titleDescription: {
    margin: 10,
    fontSize: 22,
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
  },
  displayDescription: {
    height: '60%',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginHorizontal: 10,
  },
  btnBookingNow: {
    backgroundColor: '#EEB156',
    width: WITDH / 2,
    height: 55,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  contentBtn: {
    fontSize: 20,
    fontFamily: InriaSerifBold,
    color: '#433F3F',
  },
});

export default styles;
