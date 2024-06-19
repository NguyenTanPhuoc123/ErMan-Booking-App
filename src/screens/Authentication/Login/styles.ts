import {StyleSheet} from 'react-native';
import {WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  title: {
    color: '#FFC107',
    fontSize: 40,
    fontWeight: '500',
    padding: 30,
  },
  textInput: {
    margin: 10,
    width: WITDH - 45,
    height: 65,
    padding: 20,
    fontSize: 20,
    backgroundColor: '#E8E4EA',
    borderRadius: 30,
    color: '#433F3F',
  },
  txtError: {
    color: '#F67067',
    marginVertical: 5,
  },
  label: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'left',
    width: WITDH - 45,
  },
  iconEye: {
    position: 'absolute',
    right: 25,
    top: 33,
  },
  buttonContainer: {
    backgroundColor: '#EEB156',
    alignItems: 'center',
    justifyContent: 'center',
    width: WITDH / 2,
    height: 60,
    borderRadius: 25,
  },
  buttonLabel: {
    color: '#433F3F',
    fontSize: 32,
    fontWeight: '400',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#FFC107',
    padding: 5,
  },
  btnForgotPassword: {
    margin: 25,
    alignSelf: 'flex-end',
  },
  signUp: {
    color: '#FFC107',
    paddingHorizontal: 5,
  },
  containerSignUp: {
    flexDirection: 'row',
    margin: 30,
  },
});

export default styles;
