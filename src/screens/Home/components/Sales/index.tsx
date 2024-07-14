import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import styles from './style';
import Carousel from 'react-native-reanimated-carousel';
import {SLIDE_SALES} from '../../../../constants/icons';
import globalStyle from '../../../../constants/styles';

type DiscountProps = {
  content: string;
};
const SaleComponent = (props: DiscountProps) => {
  const {content} = props;
  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.imgStyle}
      source={SLIDE_SALES}
      resizeMode="cover">
      <Text style={[globalStyle.colorYellowBold, styles.title]}>
        Erman Salon
      </Text>
      <Text style={[globalStyle.fontText, styles.contentSale]}>{content}</Text>
    </ImageBackground>
  );
};

export default SaleComponent;
