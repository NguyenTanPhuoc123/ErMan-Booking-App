import {StyleSheet} from 'react-native';
import { InriaSerifBold } from '../../constants/font';
import { WITDH } from '../../constants/styles';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  titleHeader: {
    fontSize: 22,
    marginHorizontal: 5,
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
  },
  bookingInfo:{
    marginVertical:10,
    width:WITDH
  },
  titleBody:{
    fontSize: 22,
    marginHorizontal: 10,
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
  }
});

export default styles;
