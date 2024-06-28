import {StyleSheet} from 'react-native';
import {InriaSerifBold} from '../../../constants/font';
import {HEIGHT, WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 30,
    alignSelf: 'center',
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
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 20,
  },
  input: {
    marginLeft: 10,
    fontSize: 20,
    width: WITDH / 2 + 30,
    textAlign: 'center',
  },
  container: {
    margin: 20,
    flexDirection: 'row',
    marginLeft: 20,
    paddingTop: 10,
  },
  textinfo: {
    fontSize: 22,
    marginTop: 20,
  },
  text: {
    marginLeft: 10,
    width: WITDH / 2 + 30,
    fontSize: 20,
  },
  containerButton: {
    margin: 30,
    width: WITDH / 1.5,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#F3B20A',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textButton: {
    fontSize: 24,
    fontFamily: InriaSerifBold,
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
});

export default styles;
