import {View, Text, Image} from 'react-native';
import React from 'react';
import globalStyle from '../../constants/styles';
import styles from './style';

type ListItemEmptyProps = {
  content: string;
  image: number;
};

const ListItemEmpty = (props: ListItemEmptyProps) => {
  const {content, image} = props;
  return (
    <View style={globalStyle.containerForm}>
      <Image source={image} resizeMode="cover" style={styles.img} />
      <Text style={[globalStyle.fontText,styles.text]}>{content}</Text>
    </View>
  );
};

export default ListItemEmpty;
