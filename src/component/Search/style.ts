import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';

const styles = StyleSheet.create({
  containerSearch: {
    width: WITDH - 30,
    backgroundColor: '#675B5B',
    height: 55,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: 'center',
  },
  inputSearch: {
    backgroundColor: 'transparent',
    padding: 14,
    height: 55,
    fontSize: 20,
    borderRadius: 25,
    width: '87%',
    alignSelf: 'flex-start',
  },
  iconSearch: {
    position: 'absolute',
    right: 25,
    top: 18,
    color: '#d4d3d6',
  },
});

export default styles;
