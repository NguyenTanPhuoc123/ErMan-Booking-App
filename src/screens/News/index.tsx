import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyle from '../../constants/styles';
import styles from './style';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useNews from './useNews';

const NewsScreen = () => {
  const {goBack, goToNotifcation} = useNews();
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        leftComponent={
          <TouchableOpacity onPress={goBack}>
            <Icon
              name="arrow-left"
              size={25}
              style={globalStyle.fontText}
              solid
            />
          </TouchableOpacity>
        }
        centerComponent={<Text style={styles.titleHeader}>Tin tức</Text>}
        rightContainerStyle={styles.rightComponentHeader}
        rightComponent={
          <TouchableOpacity onPress={goToNotifcation}>
            <View>
              <View style={styles.pointNotification}></View>
              <Icon name="bell" size={25} style={globalStyle.fontText} solid />
            </View>
          </TouchableOpacity>
        }
      />
    );
  };
  return <View style={globalStyle.container}>{renderHeader()}</View>;
};

export default NewsScreen;
