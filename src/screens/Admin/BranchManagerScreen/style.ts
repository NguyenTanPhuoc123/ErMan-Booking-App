import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 60,
    right: 20,
    zIndex: 99999,
  },
});

export default styles;
