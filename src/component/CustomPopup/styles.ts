import {StyleSheet} from 'react-native';
import {HEIGHT, WITDH} from '../../constants/styles';
import * as Font from '../../constants/font';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  contentContainer: {
    borderRadius: 25,
    paddingVertical: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
    maxHeight: '75%',
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  body: {
    justifyContent: 'center',
    padding: 20,
  },
  footer: {
    paddingHorizontal: 40,
  },
  footerHorizontal: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  message: {
    fontSize: 18,
    color: '#433F3F',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    color: '#433F3F',
    fontFamily: Font.InriaSerifBold,
  },
  //Primary Btn
  primaryBtn: {
    borderRadius: 15,
    paddingVertical: 8,
    alignItems: 'center',
  },
  primaryText: {
    color: '#433F3F',
    fontSize: 20,
    lineHeight: 32,
    fontFamily: Font.InriaSerifBold,
  },
  horizontalButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default styles;
