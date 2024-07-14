import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH - 30,
    height: 200,
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
  },
  imgStyle: {
    borderRadius: 25,
  },
  title: {
    fontFamily: InriaSerifBold,
    fontSize: 20,
    margin: 7,
  },
  contentSale: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 12,
    width: '65%',
  },
  discount: {
    fontFamily: InriaSerifBold,
    fontSize: 26,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default styles;
