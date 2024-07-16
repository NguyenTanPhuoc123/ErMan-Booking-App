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
  infoBooking: {
    flex: 1,
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
  },
  contentBtnBooking: {
    fontSize: 20,
    fontFamily: InriaSerifBold,
    color: '#433F3F',
  },
  label: {
    color: '#d4d3d6',
    fontSize: 22,
    fontFamily: InriaSerifBold,
    margin: 15,
    width: WITDH / 1.3,
  },
  payment: {
    marginVertical: 20,
  },
  billContainer: {
    width: '90%',
    margin:10,
  },
  titlePayment: {
    color: '#d4d3d6',
    fontSize: 22,
    fontFamily: InriaSerifBold,
    margin: 15,
    width: WITDH / 1.3,
    textAlign: 'center',
  },
  btnPay:{
    backgroundColor: '#FFF',
    width: WITDH - 100,
    height: 50,
    margin: 20,
    justifyContent: 'space-around',
    flexDirection:'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  }
});

export default styles;
