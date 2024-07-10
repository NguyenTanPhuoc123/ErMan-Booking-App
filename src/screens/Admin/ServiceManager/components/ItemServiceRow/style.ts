import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../../constants/styles';
import {InriaSerifBold} from '../../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH / 2 - 20,
    backgroundColor: '#474444',
    height: 'auto',
    borderRadius: 20,
    paddingBottom: 10,
    margin: 10,
  },
  img: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    margin: 3,
    fontFamily: InriaSerifBold,
  },
  price: {
    fontSize: 17,
    fontFamily: InriaSerifBold,
    marginHorizontal: 10,
  },
  time: {
    marginHorizontal: 10,
    marginTop: 3,
  },
});

export default styles;
