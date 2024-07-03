import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';
import styles from './style';
import globalStyle from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../navigation/navigation';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {BRANCH} from '../../constants/icons';
const BranchDetailScreen = () => {
  const {branch, status} = useRoute().params as any;
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={[globalStyle.fontText, styles.titleHeader]}>
            Thông tin chi nhánh
          </Text>
        }
        leftComponent={
          <TouchableOpacity onPress={() => NavigationActionService.pop()}>
            <Icon
              name="arrow-left"
              size={25}
              style={globalStyle.fontText}
              solid
            />
          </TouchableOpacity>
        }
      />
    );
  };

  const renderDescription = () => (
    <View style={styles.containerDescription}>
      <Text style={styles.titleDescription}>Mô tả</Text>
      <ScrollView>
        <Text style={[globalStyle.fontText, styles.description]}>
          {'    '}
          {branch.description || 'Không có mô tả'}
        </Text>
      </ScrollView>
    </View>
  );

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <FastImage
        source={!branch.image ? BRANCH : {uri: branch.image}}
        style={styles.img}
        resizeMode="cover"
      />
      <Text
        style={[
          globalStyle.fontText,
          styles.status,
          status ? globalStyle.colorStatusOpen : globalStyle.colorStatusClose,
        ]}>
        {status ? 'Đang mở' : 'Đã đóng'}
      </Text>
      <Text style={[globalStyle.fontText, styles.branchName]}>
        {branch.branchName}
      </Text>
      <Text style={[globalStyle.fontText, styles.time]}>
        Thời gian mở cửa: Từ {branch.openTime + '-' + branch.closeTime}
      </Text>
      <Text style={[globalStyle.fontText, styles.time]}>
        Địa chỉ: {branch.address}
      </Text>
      <View style={styles.rate}>
        {new Array(5).fill(0).map((_, index) => (
          <Icon key={index} name="star" color="#F3CC67" solid size={20} />
        ))}
      </View>
      {renderDescription()}
    </View>
  );
};

export default BranchDetailScreen;
