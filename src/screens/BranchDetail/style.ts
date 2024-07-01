import {StyleSheet} from 'react-native';
import {InriaSerifBold} from '../../constants/font';
import {HEIGHT, WITDH} from '../../constants/styles';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  titleHeader: {
    fontSize: 22,
    fontFamily: InriaSerifBold,
  },
  img: {
    width: WITDH,
    height: HEIGHT / 3 - 50,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  branchName: {
    margin: 20,
    fontSize: 28,
    fontFamily: InriaSerifBold,
    textAlign: 'center',
  },
  status:{
    fontSize:16,
    alignSelf:'flex-end',
    marginTop:8,
    marginRight:20
  },
  rate:{
    flexDirection:'row',
    marginVertical:10,
    marginHorizontal:20
  },
  time: {
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  containerDescription: {
    height: HEIGHT / 3,
    width: WITDH,
    backgroundColor: '#474444',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  titleDescription: {
    margin: 10,
    fontSize: 22,
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginHorizontal: 10,
  },
});

export default styles;
