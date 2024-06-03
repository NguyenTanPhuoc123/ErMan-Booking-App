import {Dimensions, StyleSheet} from 'react-native';

export const WITDH = Dimensions.get('screen').width;
export const HEIGHT = Dimensions.get('screen').height;

const globalStyle = StyleSheet.create({
  fullScreenSize: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  w100: {
    width: WITDH,
  },
  h100: {
    height: HEIGHT,
  },
  flex1: {
    flex: 1,
  },
  fontText:{
    fontFamily: 'InriaSerif-Regular',
    color: '#D4D3D6',
    ...StyleSheet
  },
  container:{
    backgroundColor:'#282828',
    flex:1
  },
  containerForm:{
    backgroundColor:'#282828',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
},
});

export default globalStyle;
