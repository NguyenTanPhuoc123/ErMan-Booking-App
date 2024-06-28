import {StyleSheet} from 'react-native';
import {InriaSerifBold} from '../../../constants/font';
import {WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#433F3F',
    flexDirection: 'row',
    width: WITDH,
    height: 'auto',
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  info: {
    fontSize: 20,
    color: '#d4d3d6',
    fontFamily: InriaSerifBold,
  },
});

export default styles;
