import {StyleSheet} from 'react-native';
import {WITDH} from '../../constants/styles';
import {InriaSerifBold} from '../../constants/font';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  leftComponentHeader: {
    flexDirection: 'row',
    width: WITDH / 2,
  },
  textHeader: {
    fontSize: 18,
    marginHorizontal: 5,
    alignSelf: 'flex-start',
    fontFamily: InriaSerifBold,
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
  buttonComponent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  slideDiscount: {
    alignSelf: 'center',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  containerList: {
    marginVertical: 20,
  },
  lineTitle: {
    marginHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleList: {
    fontFamily: InriaSerifBold,
    fontSize: 22,
  },
  txtViewMore: {
    color: '#EEB156',
    fontSize: 16,
    marginTop: 10,
  },
  containerBooking: {
    width: WITDH - 30,
    height: 200,
    backgroundColor: '#5A5656',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCustomer: {
    width: '35%',
    height: '85%',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  noItems: {
    fontFamily: InriaSerifBold,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#D4D3D6',
  },
});

export default styles;
