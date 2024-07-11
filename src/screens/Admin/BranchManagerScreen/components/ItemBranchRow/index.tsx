import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Branch} from '../../../../../modules/branch/model';
import NavigationActionService from '../../../../../navigation/navigation';
import {ADD_BRANCH_SCREEN} from '../../../../../constants/screen_key';
import globalStyle from '../../../../../constants/styles';
import styles from './style';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {checkStatus} from '../../../../../utils/date';
import {BRANCH} from '../../../../../constants/icons';
import {formatDistance} from '../../../../../utils/distance';

const ItemBranchRow = (props: Branch) => {
  const {image, branchName, address, openTime, closeTime} = props;
  const status = checkStatus(openTime, closeTime);
  const goToDetail = () => {
    NavigationActionService.navigate(ADD_BRANCH_SCREEN, {branch: props});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToDetail}>
      <FastImage
        source={!image ? BRANCH : {uri: image}}
        resizeMode="cover"
        style={styles.img}
      />
      <Text
        style={[
          globalStyle.fontText,
          styles.status,
          status ? globalStyle.colorStatusOpen : globalStyle.colorStatusClose,
        ]}>
        {status ? 'Đang mở' : 'Đã đóng'}
      </Text>
      <Text style={[globalStyle.fontText, styles.title]}>{branchName}</Text>
      <Text style={[globalStyle.fontText, styles.address]}>{address}</Text>
      <View style={styles.bottomItem}>
        <View style={styles.rate}>
          {new Array(5).fill(0).map((_, index) => (
            <Icon key={index} name="star" color="#F3CC67" solid size={9} />
          ))}
        </View>
        <View style={styles.distance}>
          <Icon name="map-marker-alt" size={9} solid color="#D4D3D6" />
          <Text style={[globalStyle.fontText, styles.textDistance]}>
            {' '}
            {formatDistance(1000)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemBranchRow;
