import {StyleSheet} from 'react-native';
import {HEIGHT, WITDH} from '../../../../constants/styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  containerStylist: {
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#EEB156',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
  },
  name: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 7,
  },
  input: {
    fontSize: 20,
    width: WITDH / 2 + 20,
    textAlign: 'center',
  },
  labelSelectDate: {
    fontSize: 16,
    marginRight: 20,
  },
  selectDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerTime: {
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  containerTimeClose: {
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: '#898884',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  containerSelectedTime: {
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: '#EEB156',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  listTime: {
    width: '100%',
    height: 140,
    marginHorizontal: 10,
  },
  time: {
    color: '#000',
  },
});

export default styles;
