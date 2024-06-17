import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import { InriaSerifBold } from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH / 2 -20,
    backgroundColor: '#474444',
    height: 180,
    borderRadius: 20,
    margin:10
  },
  img: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  title:{
    fontSize:16,
    textAlign:'center',
    margin:3,
    fontFamily:InriaSerifBold,
  },
  price:{
    fontSize:17,
    fontFamily:InriaSerifBold,
    marginHorizontal:10,
    position:'absolute',
    bottom:10
  }
});

export default styles;
