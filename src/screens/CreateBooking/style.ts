import {StyleSheet} from 'react-native';
import {InriaSerifBold} from '../../constants/font';
import {WITDH} from '../../constants/styles';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  titleHeader: {
    fontSize: 22,
    fontFamily: InriaSerifBold,
  },
  bodyContainer: {
    flex: 1,
  },
  label: {
    color: '#d4d3d6',
    fontSize: 22,
    fontFamily: InriaSerifBold,
    margin: 15,
    width: WITDH / 1.3,
  },
  infoBooking: {
    width: WITDH,
    height: '75%',
  },
  btnBooking: {
    backgroundColor: '#F3CC67',
    width: WITDH - 100,
    height: 50,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
  contentBtnBooking: {
    fontSize: 20,
    fontFamily: InriaSerifBold,
    color: '#433F3F',
  },
});

export default styles;
