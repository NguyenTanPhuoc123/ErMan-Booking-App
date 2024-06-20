import {StyleSheet} from 'react-native';
import {InriaSerifBold} from '../../../constants/font';
import {HEIGHT, WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  containerHeader: {
    borderColor: '#433F3F',
    height: 100,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 30,
    alignSelf: 'center',
  },
  titleHeader: {
    fontSize: 22,
    marginHorizontal: 5,
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
  },
  uploadImg: {
    position: 'absolute',
    right: WITDH / 3 + 10,
    top: HEIGHT / 8 + 10,
    backgroundColor: '#716868',
    padding: 5,
    borderRadius: 15,
    zIndex: 9999,
  },
  infoContainer: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 20,
  },
  input: {
    fontSize: 20,
    width: WITDH / 2 + 50,
    textAlign: 'center',
  },
  gender: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: WITDH / 2 + 50,
  },
  labelGender: {
    fontSize: 20,
  },
  btnEdit: {
    backgroundColor: '#EEB156',
    width: WITDH - 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  contentBtn:{
    fontFamily:InriaSerifBold,
    fontSize:26,
    color:'#433F3F'
  }
});

export default styles;
