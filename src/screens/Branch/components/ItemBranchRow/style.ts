import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH / 2 - 20,
    backgroundColor: '#474444',
    height: 'auto',
    borderRadius: 20,
    margin: 10,
    paddingVertical: 5,
  },
  img: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  status: {
    fontSize: 12,
    alignSelf: 'flex-end',
    margin: 4,
    marginRight: 10,
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
  },
  rate: {
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 7,
  },
  bottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distance: {
    flexDirection: 'row',
    marginRight: 20,
  },
  textDistance: {
    fontSize: 9,
  },
});

export default styles;
