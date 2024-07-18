import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold, InriaSerifRegular} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#433F3F',
    width: WITDH / 1.1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    margin: 14,
    marginHorizontal: 12,
  },
  text: {
    color: '#D4D3D6',
    fontSize: 16,
    fontFamily: InriaSerifRegular,
    marginLeft: 7,
    width: WITDH / 1.2,
  },
  label: {
    color: '#d4d3d6',
    fontSize: 22,
    fontFamily: InriaSerifBold,
    margin: 15,
    width: WITDH / 1.3,
  },
  branchBookingNear:{
    borderColor:'#fff',
    borderWidth:2,
    width: WITDH/2,
    height: 'auto',
    paddingVertical:17,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginHorizontal:10,
    marginBottom:10
  },
  textBranchBookingNear: {
    color: '#D4D3D6',
    fontSize: 16,
    fontFamily: InriaSerifRegular,
  },
});

export default styles;
