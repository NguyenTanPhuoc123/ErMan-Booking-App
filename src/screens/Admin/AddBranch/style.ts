import {StyleSheet} from 'react-native';
import {InriaSerifBold} from '../../../constants/font';
import { WITDH } from '../../../constants/styles';

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
  infoContainer: {
    margin: 20,
  },
  img: {
    width: WITDH,
    height: 250,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignSelf: 'center',
  },
  label: {
    fontSize: 20,
  },
  btnUpload: {
    backgroundColor: '#DFDA2D',
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    margin: 10,
    borderRadius: 10,
  },
  contentBtnUpload: {
    fontSize: 16,
    color: '#433443',
    fontFamily: InriaSerifBold,
  },
  input: {
    fontSize: 20,
    width: '85%',
  },
  txtError: {
    color: '#F67067',
    marginVertical: 5,
    marginHorizontal: 9,
    textAlign: 'center',
  },
  timeContainer:{
    flexDirection:'row',
    justifyContent:'space-between',

  },
  btnAdd: {
    backgroundColor: '#DFDA2D',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 20,
    height: 50,
    borderRadius: 20,
  },
  contentBtnAdd: {
    fontSize: 20,
    color: '#433443',
    fontFamily: InriaSerifBold,
  },
});

export default styles;
