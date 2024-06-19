import { Text, TouchableOpacity, View} from 'react-native';
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
    <View style={styles.container}>
      <FastImage source={image} style={styles.img} />
      <Text style={[globalStyle.fontText, styles.title]}>{title}</Text>
      <TouchableOpacity style={styles.readNews} >
        <Text style={[globalStyle.fontText,styles.contentBtn]}>Đọc ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemNewsRow;
