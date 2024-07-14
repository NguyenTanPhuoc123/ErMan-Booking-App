import {StyleSheet} from 'react-native';
import {WITDH} from '../../../constants/styles';
import {InriaSerifBold} from '../../../constants/font';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  containerliststaff: {
    backgroundColor: '#433F3F',
    flexDirection: 'row',
    width: WITDH - 20,
    height: 100,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textinfo1:{
    marginTop:10,
  },
  iconcalendar:{
    alignItems: 'center',
     marginTop: 5,
     color:'white',
     marginRight:10
  },
  containerView: {
    flexDirection: 'row',
  },

  containerButton: {
    width: '45%',
    height: 100,
    margin: 10,
    backgroundColor: '#666666',
    borderRadius: 15,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinfo: {
    textAlign: 'center',
    color: '#fff',
  },
  textvalue: {
    textAlign: 'center',
    color: '#F3B20A',
    fontWeight: 'bold',
    fontFamily:InriaSerifBold
  },
  icon: {
    color: '#F3B20A',
  },
  containerIcon: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  info: {
    marginLeft: 5,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 40,
    marginRight: 20,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    color: '#d4d3d6',
    fontFamily: InriaSerifBold,
  },
});

export default styles;
