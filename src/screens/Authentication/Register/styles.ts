import {StyleSheet} from 'react-native';
import {WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  title: {
    color: '#B689FF',
    fontSize: 40,
    fontWeight: '500',
    padding: 30,
    marginBottom: 20,
  },
  textInput: {
    margin: 10,
    width: WITDH - 45,
    height: 65,
    padding: 20,
    fontSize: 20,
    backgroundColor: '#E8E4EA',
    borderRadius: 30,
    color: '#000',
  },
  txtError: {
    color: '#F67067',
    marginVertical: 20,
  },
  label: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'left',
    width: WITDH - 45,
  },
  buttonContainer: {
    backgroundColor: '#6740A5',
    alignItems: 'center',
    justifyContent: 'center',
    width: WITDH / 2,
    height: 60,
    borderRadius: 25,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '400',
  },
  signIn: {
    color: '#B689FF',
    paddingHorizontal: 5,
  },
  containerSignIn: {
    flexDirection: 'row',
    margin: 30,
  },
});

export default styles;
