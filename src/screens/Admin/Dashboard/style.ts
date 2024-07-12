import {StyleSheet} from 'react-native';
import {HEIGHT, WITDH} from '../../../constants/styles';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerView: {
  
    flexDirection: 'row',
    justifyContent:'space-around',
    flexWrap: 'wrap',
  },
  containerButton: {
    width: 180,
    height: 100,
    margin: 10,
    backgroundColor: '#666666',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 2,
  },
  inner: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },
  textinfo: {
    textAlign: 'center',
    color: '#fff',
  },
  containerIcon:{
    flexDirection:'row',
    paddingHorizontal:10,
    alignItems:'center'
  },
  info:{
    marginLeft:5,
  }
});

export default styles;
