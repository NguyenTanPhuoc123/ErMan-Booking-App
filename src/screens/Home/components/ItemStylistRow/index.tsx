import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Staff} from '../../../../modules/user/model';
import {AVARTAR_DEFAULT_STAFF} from '../../../../constants/icons';

const ItemStylistRow = (props: Staff) => {
  const {avatar, firstname, lastname, workPlace} = props;
  
  return (
    <View style={styles.container}>
      <FastImage
        source={!avatar ? AVARTAR_DEFAULT_STAFF : {uri: avatar}}
        style={styles.img}
        resizeMode="cover"
      />
      <Text style={[globalStyle.fontText, styles.title]}>
        {firstname + ' ' + lastname}
      </Text>
      <Text style={[globalStyle.fontText, styles.workPlace]}>{workPlace}</Text>
        <TouchableOpacity style={styles.chat}>
          <Text style={[globalStyle.fontText, styles.contentBtn]}>
            Gửi tin nhắn
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default ItemStylistRow;
