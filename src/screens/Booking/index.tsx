import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle, {WITDH} from '../../constants/styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles from './style';
import Tabs from './components/Tabs';
import useBooking from './useBooking';

const MyBookingScreen = () => {
  const {index, setIndex, routes, goToNotifcation, goToCreateBooking, bookings} =
    useBooking();

  const renderUpcoming = () => <Tabs name="upcoming" data={bookings}  />;
  const renderOngoing = () => <Tabs name="ongoing" data={bookings}/>;
  const renderComplete = () => <Tabs name="completed" data={bookings}/>;
  const renderCanceled = () => <Tabs name="canceled" data={bookings} />;

  const renderScene = SceneMap({
    upcoming: renderUpcoming as any,
    ongoing: renderOngoing as any,
    completed: renderComplete as any,
    canceled: renderCanceled as any,
  });

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
          style={{backgroundColor: '#433F3F'}}
          labelStyle={styles.textTab}
          activeColor="#F3B20A"
          inactiveColor="#D4D3D6"
        />
      )}
    />
  );

  return (
    <>
      <View style={globalStyle.container}>
        {renderHeader()}
        {renderBody()}
        {renderButtonAddBooking()}
      </View>
    </>
  );
};
export default MyBookingScreen;
