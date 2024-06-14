import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import styles from './style';
import Carousel from 'react-native-reanimated-carousel';
import {SLIDE_SALES} from '../../../../constants/icons';
import globalStyle from '../../../../constants/styles';

type DiscountProps = {
  code: string;
  content: string;
  discountPercent: number;
};
const SaleComponent = (props: DiscountProps) => {
  const {code, content, discountPercent} = props;
  const renderCodeDiscount = () => {
    return (
      <View style={styles.containerDiscount}>
        <Text style={[globalStyle.fontText, styles.textCodeDiscount]}>
          {code}
        </Text>
      </View>
    );
  };
  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.imgStyle}
      source={SLIDE_SALES}
      resizeMode="cover">
      <Text style={[globalStyle.colorYellowBold, styles.title]}>
        Khuyến mãi đặt biệt
      </Text>
      {renderCodeDiscount()}
      <Text style={[globalStyle.fontText, styles.contentSale]}>{content}</Text>
      <Text style={[globalStyle.colorYellowRegular, styles.discount]}>
        Giảm {discountPercent}%
      </Text>
    </ImageBackground>
  );
};

export default SaleComponent;
