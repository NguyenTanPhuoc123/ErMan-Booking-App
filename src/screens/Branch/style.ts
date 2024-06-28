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
  btnBranchNear:{
    flexDirection:'row',
    backgroundColor:'#F3CC67',
    width: WITDH/2,
    height:50,
    borderRadius:20,
    justifyContent:'space-around',
    paddingHorizontal:4,
    alignItems:'center',
    margin:10
  },
  contentBtn:{
    color:'#000',
    fontSize:18,
    fontFamily:InriaSerifBold
  }
});

export default styles;
