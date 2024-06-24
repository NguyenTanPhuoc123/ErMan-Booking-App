import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleProp,
  TextStyle,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle, {WITDH} from '../../constants/styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles from './style';
import Tabs from './components/Tabs';
import {InriaSerifBold} from '../../constants/font';

const renderUpcoming = () => <Tabs name="upcoming" id="1" />;

const renderOngoing = () => <Tabs name="ongoing" id="2" />;
const renderComplete = () => <Tabs name="complete" id="3" />;
const renderCanceled = () => <Tabs name="Canceled" id="4" />;

const renderScene = SceneMap({
  upcoming: renderUpcoming as any,
  ongoing: renderOngoing as any,
  complete: renderComplete as any,
  canceled: renderCanceled as any,
});

const MyBookingScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'upcoming',
      title: 'Sắp tới',
    },
    {
      key: 'ongoing',
      title: 'Đang làm',
    },
    {
      key: 'complete',
      title: 'Hoàn thành',
    },
    {
      key: 'canceled',
      title: 'Đã huỷ',
    },
  ]);
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={styles.textBooking}>Lịch đặt của tôi</Text>
        }
        rightContainerStyle={styles.rightComponentHeader}
        rightComponent={
          <TouchableOpacity>
            <View>
              <View style={styles.pointNotification}></View>
              <Icon name="bell" size={25} style={globalStyle.fontText} solid />
            </View>
          </TouchableOpacity>
        }
      />
    );
  };

  const Search = () => {
    return (
      <View style={styles.containerSearch}>
        <TextInput
          style={[globalStyle.fontText, styles.inputSearch]}
          placeholder="Thông tin đặt lịch,..."
          placeholderTextColor="#D4D3D6"
        />
        <TouchableOpacity style={styles.btnSearch}>
          <Icon name="search" style={[globalStyle.fontText]} size={20} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderBody = () => (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: WITDH}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{
            backgroundColor: '#F3B20A',
            height: 3,
          }}
          style={{backgroundColor: '#282828'}}
          labelStyle={{
            fontFamily: InriaSerifBold,
            color: '#D4D3D6',
            textTransform: 'none',
            fontSize: 14,
          }}
          activeColor="#F3B20A"
          inactiveColor="#D4D3D6"
          pressColor="rgba(255, 255, 255, 0.5)"
          pressOpacity={0.8}
        />
      )}
    />
  );

  return (
    <>
      <View style={globalStyle.container}>
        {renderHeader()}
        {Search()}
        {renderBody()}
      </View>
    </>
  );
};
export default MyBookingScreen;
