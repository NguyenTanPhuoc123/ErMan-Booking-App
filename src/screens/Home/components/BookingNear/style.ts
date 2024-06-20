import {StyleSheet} from 'react-native';
import {WITDH} from '../../../../constants/styles';
import {InriaSerifBold} from '../../../../constants/font';

const styles = StyleSheet.create({
  container: {
    width: WITDH - 30,
    height: 200,
    backgroundColor: '#5A5656',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
  },
  avatarCustomer: {
    width: '35%',
    height: '85%',
    borderRadius: 15,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  info: {
    marginTop: 10,
    flex: 1,
  },
  name: {
    fontFamily: InriaSerifBold,
    fontSize: 22,
    marginBottom: 10,
  },
  otherInfo: {
    fontSize: 16,
    width: '100%',
  },
  viewDetail: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  txtViewDetail: {
    color: '#FFC107',
    fontSize: 12,
  },
  titleEmpty: {
    fontSize: 28,
  },
  containerEmpty: {
    width: WITDH - 30,
    height: 200,
    backgroundColor: '#5A5656',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
