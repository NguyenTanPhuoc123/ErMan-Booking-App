import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle, {WITDH} from '../../constants/styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles from './style';
import Tabs from './components/Tabs';
import useBooking from './useBooking';
import SearchComponent from '../../component/Search';

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
  const {index, setIndex, routes, goToNotifcation, goToCreateBooking} =
    useBooking();
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

  const renderButtonAddBooking = () => (
    <TouchableOpacity
      style={[globalStyle.bgPopupCommon, styles.containerButton]}
      onPress={goToCreateBooking}>
      <Icon name="plus" size={24} />
    </TouchableOpacity>
  );

  const renderBody = () => (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: WITDH}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={styles.statusBar}
          style={{backgroundColor: '#282828'}}
          labelStyle={styles.textTab}
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
        <SearchComponent
          placeholder="Thông tin lịch đặt,..."
          searchValue=""
          onSearch={() => {}}
        />
        {renderBody()}
        {renderButtonAddBooking()}
      </View>
    </>
  );
};
export default MyBookingScreen;
