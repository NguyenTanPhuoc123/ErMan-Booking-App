import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';
import {InriaSerifBold} from '../../constants/font';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 30,
    alignSelf: 'center',
  },
  body: {},
  showInfo: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  label: {
    marginLeft: 15,
    fontSize: 20,
    fontFamily: InriaSerifBold,
  },
  info: {
    fontSize: 20,
    width: '50%',
  },
  textPersonal: {
    fontSize: 24,
    marginHorizontal: 5,
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
  },
  buttonEdit: {
    backgroundColor: '#EEB156',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: WITDH / 1.5,
    height: 60,
    borderRadius: 20,
    position: 'absolute',
    bottom: 100,
  },
  textEdit: {
    color: '#433F3F',
    fontSize: 26,
    fontFamily: InriaSerifBold,
  },
});

export default styles;
