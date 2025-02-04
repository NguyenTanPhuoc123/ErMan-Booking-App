import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold, InriaSerifRegular} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH / 1.2,
    height: 160,
    margin: 10,
  },
  containerSelect: {
    backgroundColor: '#433F3F',
    width: WITDH / 1.1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  text: {
    color: '#D4D3D6',
    fontSize: 16,
    fontFamily: InriaSerifRegular,
    marginLeft: 7,
  },
  total: {
    fontSize: 16,
    fontFamily: InriaSerifRegular,
    color: '#EEB156',
  },
  label: {
    color: '#d4d3d6',
    fontSize: 22,
    fontFamily: InriaSerifBold,
    margin: 15,
    width: WITDH / 1.3,
  },
  service: {
    width: WITDH / 2.7,
  },
});

export default styles;
