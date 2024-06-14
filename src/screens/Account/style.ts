import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';

const styles = StyleSheet.create({
  showHeader: {
    backgroundColor: '#282828',
  },
  containerHeader: {
    borderColor: '#433F3F',
  },
  showavatar: {
    marginVertical: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textHeader: {
    fontSize: 30,
    marginTop: 15,
    alignSelf: 'flex-start',
    fontFamily: 'InriaSerif-Bold',
    color: '#D4D3D6',
  },
  rightComponentHeader: {
    width: WITDH / 2,
    justifyContent: 'center',
  },
  pointNotification: {
    backgroundColor: '#E24747',
    width: 8,
    height: 8,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },
  textAccount: {
    fontSize: 30,
    marginHorizontal: 5,
    fontFamily: 'InriaSerif-Bold',
    color: '#D4D3D6',
  },
  containerBody: {
    backgroundColor: '#433F3F',
    marginVertical: 50,
  },
  show: {
    flexDirection: 'row',
    padding: 15,
  },
  content: {
    fontSize: 24,
    alignSelf: 'center',
    marginLeft: 30,
  },
});

export default styles;
