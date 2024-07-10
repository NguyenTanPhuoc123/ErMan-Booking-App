import {StyleSheet} from 'react-native';
import {InriaSerifBold} from '../../../constants/font';
import {WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  btnAdd:{
    justifyContent:'center',
    alignItems:'center',
    width:60,
    height:60,
    borderRadius:30,
    position:'absolute',
    bottom:60,
    right:20,
    zIndex:99999
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default styles;
