import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
  title: {
    color: '#B689FF',
    fontSize: 50,
    fontWeight: '500',
    padding: 30,
  },
  textInput: {
    margin: 10,
    width: Dimensions.get('screen').width - 45,
    height: 65,
    padding: 20,
    fontSize: 20,
    backgroundColor: '#E8E4EA',
    borderRadius: 30,
    color: '#000',
  },
  txtError: {
    color: '#F67067',
    alignSelf: 'flex-start',
    left: 33,
    marginVertical: 5,
  },
  label: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'left',
    width: Dimensions.get('screen').width - 45,
  },
  iconEye: {
    position: 'absolute',
    right: 25,
    top: 33,
  },
  buttonContainer: {
    backgroundColor: '#6740A5',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 2,
    height: 60,
    borderRadius: 25,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '400',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#B689FF',
    padding: 5,
  },
  btnForgotPassword: {
    margin: 25,
    alignSelf: 'flex-end',
  },
  signUp: {
    color: '#B689FF',
    paddingHorizontal: 5,
  },
  containerSignUp: {
    flexDirection: 'row',
    margin: 30,
  },
});

export default styles;
