import {StyleSheet} from 'react-native';
import {WITDH} from '../../../constants/styles';
import {InriaSerifBold} from '../../../constants/font';

const styles = StyleSheet.create({
  containerHeader: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#282828',
  },
  title: {
    color: '#FFC107',
    fontSize: 36,
    fontFamily: InriaSerifBold,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    width: WITDH / 1.4,
    margin: 40,
  },
  lineResendOtp: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: WITDH / 1.2,
  },
  resendOtp: {
    color: '#FFC107',
  },
  resendOtpDisable: {
    color: '#9D9696',
  },
  btnConfirm: {
    backgroundColor: '#EEB156',
    width: 200,
    height: 66,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  contentBtnConfirm: {
    fontSize: 22,
    color: '#433F3F',
  },
  txtError: {
    color: '#F67067',
    marginVertical: 20,
  },
});

export default styles;
