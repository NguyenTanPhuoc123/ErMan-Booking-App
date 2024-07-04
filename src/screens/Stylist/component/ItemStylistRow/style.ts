import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH / 2 - 20,
    backgroundColor: '#474444',
    height: 'auto',
    borderRadius: 20,
    margin: 10,
  },
  img: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 3,
    fontFamily: InriaSerifBold,
  },
  workPlace: {
    textAlign: 'left',
    fontSize: 14,
    marginHorizontal: 8,
    marginTop: 5,
  },
  rate: {
    flexDirection: 'row',
  },
  chat: {
    backgroundColor: '#EEB156',
    padding: 4,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
  contentBtn: {
    color: '#433F3F',
    fontSize: 16,
  },
});

export default styles;
