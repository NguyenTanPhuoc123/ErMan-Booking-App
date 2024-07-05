import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH,
    height: 100,
    backgroundColor: '#FCB704',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  selectedServices: {
    color: '#000',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: InriaSerifBold,
    color: '#000',
  },
  total: {
    fontSize: 16,
    fontFamily: InriaSerifBold,
    color: '#000',
    textAlign: 'right',
    margin: 8,
  },
  rightComponent: {
    flexDirection: 'row',
  },
  btnComplete: {
    width: 70,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#EEB156',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default styles;
