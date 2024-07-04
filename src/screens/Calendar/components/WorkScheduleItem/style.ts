import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH - 20,
    margin: 5,
    marginVertical:10,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dayInWeek: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    fontSize: 22,
    color: '#FCB704',
    fontFamily: InriaSerifBold,
    textAlign:'center'
  },
  line: {
    height: '100%',
    width: 15,
    backgroundColor: '#FCB704',
    borderTopLeftRadius:6,
    borderBottomLeftRadius:6
  },
  lineNotToday: {
    height: '100%',
    width: 15,
    backgroundColor: '#ff8572',
    borderTopLeftRadius:6,
    borderBottomLeftRadius:6
  },
  containerItem: {
    flex: 3,
    backgroundColor: '#433F3F',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:14
  },
  containerContent:{
    marginHorizontal:7,
    marginLeft:18,
  },
  text:{
    fontSize:18,
    marginVertical:2
  }
});

export default styles;
