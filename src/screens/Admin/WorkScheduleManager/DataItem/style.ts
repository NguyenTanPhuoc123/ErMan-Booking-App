import {StyleSheet} from 'react-native';
import globalStyle from '../../../../constants/styles';
import {InriaSerifBold, InriaSerifRegular} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 140,
    marginTop:20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  time: {
    ...globalStyle.colorYellowBold,
    fontSize: 18,
    fontFamily: InriaSerifBold,
  },
  bookingContainer: {
    height: '100%',
    width: '70%',
    marginHorizontal: 60,
    backgroundColor: '#fff',
    borderRadius:20
  },
  textBooking: {
    color: '#433443',
    fontSize: 16,
    fontFamily: InriaSerifRegular,
  },
});

export default styles;
