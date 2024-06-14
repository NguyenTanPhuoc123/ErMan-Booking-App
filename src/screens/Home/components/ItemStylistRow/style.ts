import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import { InriaSerifBold } from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH / 2,
    backgroundColor: '#474444',
    height: 275,
    borderRadius: 20,
    margin:10
  },
  img: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },
  title:{
    fontSize:18,
    textAlign:'center',
    marginBottom:3,
    fontFamily:InriaSerifBold,
  },
  address:{
    textAlign:'left',
    fontSize:12,
    marginHorizontal:4,
    marginTop:5
  },
  rate:{
    flexDirection:'row',
    marginVertical:4,
    marginHorizontal:7,
    position:'absolute',
    bottom:20
  }
});

export default styles;
