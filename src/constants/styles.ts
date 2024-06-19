import {Dimensions, StyleSheet} from 'react-native';
import * as Font from './font'
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
  fontText: {
    fontFamily: Font.InriaSerifRegular,
    color: '#D4D3D6',
    ...StyleSheet,
  },
  container: {
    backgroundColor: '#282828',
    flex: 1,
  },
  containerForm: {
    backgroundColor: '#282828',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgPopupCommon: {
    backgroundColor: '#FCB704',
  },
  bgPopupError: {
    backgroundColor: '#EA5950',
  },
  bgBtnPopupCommon: {
    backgroundColor: '#EEB156',
  },
  bgBtnPopupError: {
    backgroundColor: '#CA524A',
  },
  colorYellowBold:{
    color:'#EEB156',

  },
  colorYellowRegular:{
    color:'#F3CC67'
  },
  colorStatusOpen:{
    color:'#229C1F',

  },
  colorStatusClose:{
    color:'#F45B5B',

  },
});

export default globalStyle;
