import {StyleSheet} from 'react-native';
import {WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  containerHeader: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#282828',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    color: '#FFC107',
    fontSize: 36,
    padding: 10,
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
    marginHorizontal: 9,
  },
  label: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'left',
    width: WITDH - 45,
  },
  buttonContainer: {
    backgroundColor: '#EEB156',
    alignItems: 'center',
    justifyContent: 'center',
    width: WITDH / 2,
    padding: 15,
    borderRadius: 25,
  },
  buttonLabel: {
    color: '#433F3F',
    fontSize: 32,
    fontWeight: '400',
  },
  iconEye: {
    position: 'absolute',
    right: 25,
    top: 33,
  },
});

export default styles;
