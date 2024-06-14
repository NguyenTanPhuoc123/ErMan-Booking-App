import { Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
type ItemNewsRowProps = {
  image: number;
  title: string;
};

const ItemNewsRow = (props: ItemNewsRowProps) => {
  const {image, title} = props;

  return (
    <TouchableOpacity style={styles.container}>
      <FastImage source={image} style={styles.img} />
      <Text style={[globalStyle.fontText, styles.title]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ItemNewsRow;
