import {StyleSheet} from 'react-native';
import {InriaSerifBold, InriaSerifRegular} from '../../constants/font';
import globalStyle, {HEIGHT, WITDH} from '../../constants/styles';

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
  bookingInfo: {
    marginVertical: 10,
    width: WITDH,
  },
  titleBody: {
    fontSize: 22,
    marginHorizontal: 10,
    fontFamily: InriaSerifBold,
    color: '#D4D3D6',
  },
  service: {
    margin: 20,
  },
  textInfo: {
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: InriaSerifRegular,
    color: '#D4D3D6',
  },
  textStatus: {
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: InriaSerifBold,
    color: '#433443',
    backgroundColor: '#F3B20A',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  rowTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  footer: {
    width: WITDH,
    height: HEIGHT / 5,
    alignItems: 'center',
  },
  buttonEdit: {
    width: WITDH / 1.4,
    height: 60,
    backgroundColor: '#F3B20A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    margin: 10,
  },
  buttonCancel: {
    width: WITDH / 1.4,
    height: 60,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#F3B20A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    margin: 10,
  },
  contentBtn: {
    fontSize: 18,
    fontFamily: InriaSerifBold,
  },
  digitText: {
    ...globalStyle.fontText,
    color: '#433443',
  },
  textAfterTime: {
    ...globalStyle.fontText,
    color: '#f85726',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  img: {
    width: 70,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  containerImg: {
    margin: 20,
    flexDirection: 'row',
  },
  addImages:{
    backgroundColor:'#d4d3d6',
    justifyContent:'center',
    alignItems:'center',
  }
});

export default styles;
