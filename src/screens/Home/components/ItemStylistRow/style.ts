import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH / 2,
    backgroundColor: '#474444',
    height: 'auto',
    borderRadius: 20,
    margin: 10,
  },
  img: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 3,
    fontFamily: InriaSerifBold,
  },
  address: {
    textAlign: 'left',
    fontSize: 12,
    marginHorizontal: 4,
    marginTop: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rate: {
    flexDirection: 'row',
  },
  info: {
    backgroundColor: '#EEB156',
    padding: 4,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  contentBtn: {
    color: '#433F3F',
    fontSize: 14,
  },
});

export default styles;
