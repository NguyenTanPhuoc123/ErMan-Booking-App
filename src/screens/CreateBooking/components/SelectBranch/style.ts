import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifRegular} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#433F3F',
    width: WITDH / 1.1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    margin: 8,
    marginHorizontal: 12,
  },
  text: {
    color: '#D4D3D6',
    fontSize: 16,
    fontFamily: InriaSerifRegular,
    marginLeft: 7,
    width: WITDH / 1.2,
  },
});

export default styles;
