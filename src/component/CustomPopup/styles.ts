import {StyleSheet} from 'react-native';
import {HEIGHT, WITDH} from '../../constants/styles';

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
    borderColor: '#D4D3D6',
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
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'InriaSerif-Bold',
  },
  //Primary Btn
  primaryBtn: {
    borderRadius: 15,
    paddingVertical: 8,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 32,
    fontFamily: 'InriaSerif-Bold',
  },
  horizontalButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  //Secondary Btn
  //   secondaryBtn: {
  //     borderColor: colors.PRIMARY_COLOR,
  //     paddingVertical: responsiveDistance.hp_8,
  //   },
  //   secondaryBtnBorder: {
  //     borderWidth: BORDER_WIDTH,
  //     borderRadius: BORDER_RADIUS,
  //   },
  //   secondaryText: {
  //     color: colors.PRIMARY_COLOR,
  //     fontSize: responsiveDistance.wp_16,
  //     fontFamily: fonts.InterMedium,
  //   },
});

export default styles;
