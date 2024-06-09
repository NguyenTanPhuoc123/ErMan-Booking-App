import {StyleSheet} from 'react-native';
import {WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titlePage: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '500',
    width: WITDH - 100,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'InriaSerif-Bold',
  },
  subtitlePage1: {
    margin: 60,
    right: 30,
    fontSize: 24,
    color: '#fff',
    textAlign: 'left',
  },
  subtitlePage2: {
    position: 'absolute',
    bottom: 170,
    marginHorizontal: 60,
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
  },
  subtitlePage3: {
    marginHorizontal: 60,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    top: 180,
  },
  btnContainer: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 100,
  },
  titleBtn: {
    color: '#FBFAFA',
    fontSize: 24,
    fontWeight: '500',
    padding: 5,
  },
  next: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
