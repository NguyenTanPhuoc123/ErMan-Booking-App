import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import FastImage from 'react-native-fast-image';
import globalStyle from '../../../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {formatDistance} from '../../../../utils/distance';
import {Branch} from '../../../../modules/branch/model';
import {BRANCH} from '../../../../constants/icons';
import {checkStatus} from '../../../../utils/date';
import NavigationActionService from '../../../../navigation/navigation';
import {
  BRANCH_DETAIL_SCREEN,
  CREATE_BOOKING_SCREEN,
} from '../../../../constants/screen_key';
import {Service} from '../../../../modules/service/model';

type ItemBranchRowProps = {
  item: Branch;
  fromScreen?: string;
  services?: Service[];
};

const ItemBranchRow = (props: ItemBranchRowProps) => {
  const {item, fromScreen, services} = props;
  const status = checkStatus(item.openTime, item.closeTime);
  const goToDetail = () => {
    NavigationActionService.navigate(BRANCH_DETAIL_SCREEN, {
      status: status,
      branch: props,
    });
  };

  const selectBranch = () => {
    NavigationActionService.replace(CREATE_BOOKING_SCREEN, {
      branch: item,
      services: services,
    });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={fromScreen ? selectBranch : goToDetail}>
      <FastImage
        source={!item.image ? BRANCH : {uri: item.image}}
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
      <Text style={[globalStyle.fontText, styles.title]}>
        {item.branchName}
      </Text>
      <Text style={[globalStyle.fontText, styles.address]}>{item.address}</Text>
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
