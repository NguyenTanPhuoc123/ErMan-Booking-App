import {StyleSheet} from 'react-native';
import globalStyle, {WITDH} from '../../../../constants/styles';
import {InriaSerifBold} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH - 20,
    margin: 15,
    height: 200,
    backgroundColor: '#433F3F',
    alignSelf: 'center',
    borderRadius: 20,
  },
  headItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 20,
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
    margin: 12,
  },
  time: {
    fontSize: 16,
    marginBottom: 12,
    marginHorizontal: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    width: '70%',
    marginLeft: 12,
  },
  confirmContainer: {
    backgroundColor: '#F3B20A',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    position: 'absolute',
    right: 10,
    top: 42,
  },
  address: {
    fontSize: 16,
    marginBottom: 12,
    marginHorizontal: 10,
  },
  price: {
    fontSize: 20,
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
    margin: 12,
  },
  digitText: {
    ...globalStyle.fontText,
    color: '#433443',
  },
  textAfterTime: {
    ...globalStyle.fontText,
    color: '#f85726',
    fontSize:16,
    textAlign: 'center',
    marginTop:20
  },
});

export default styles;
