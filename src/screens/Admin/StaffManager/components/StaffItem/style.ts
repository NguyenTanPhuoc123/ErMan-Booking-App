import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../../constants/styles';
import {InriaSerifBold} from '../../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#433F3F',
    flexDirection: 'row',
    width: '95%',
    height: 'auto',
    margin: 10,
    paddingVertical:20,
    borderRadius: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    marginLeft: 10,
  },
  info: {
    fontSize: 16,
    color: '#d4d3d6',
    fontFamily: InriaSerifBold,
  },
  containerButton: {
    position:'absolute',
    right:20,
    marginLeft:10
  },
});

export default styles;
