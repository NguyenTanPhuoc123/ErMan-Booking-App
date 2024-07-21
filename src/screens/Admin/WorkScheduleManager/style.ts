import {StyleSheet} from 'react-native';
import globalStyle, { WITDH } from '../../../constants/styles';
import { InriaSerifBold } from '../../../constants/font';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  options: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    margin: 10,
  },
  btnBooking:{

  },
  contentBtnBooking:{
    ...globalStyle.colorYellowBold,
    fontSize:18,
    fontFamily:InriaSerifBold
  },
  input: {
    marginLeft: 20,
    fontSize: 20,
    width: WITDH / 2,
    textAlign: 'center',
  },
  containerSelectDate:{
    flexDirection:'row',
    justifyContent:'center',
    margin:10,
    alignItems:'center'
  },
  title:{
    ...globalStyle.colorYellowBold,
    fontSize:20,
    fontFamily:InriaSerifBold,
    margin:8
  }
});

export default styles;
