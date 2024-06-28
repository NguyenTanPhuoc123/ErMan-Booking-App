import {View,  TouchableOpacity, RefreshControl} from 'react-native';
import React from 'react';
import styles from './style';
import globalStyle, {WITDH} from '../../../constants/styles';
import SearchComponent from './components/Search';
import Tabs from './components/Tabs';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import useUserManager from './useUserManage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationActionService from '../../../navigation/navigation';
import {ADD_USER_SCREEN} from '../../../constants/screen_key';

const UserManagerScreen = () => {
  const {index, setIndex, routes, users, refresh, pullRefresh} =
    useUserManager();
  const renderAdmin = () => <Tabs id='1' name='Admin' refreshing={refresh} pullRefresh={pullRefresh} data={users} />;
  const renderStaff = () => <Tabs id='2' name='Staff' refreshing={refresh} pullRefresh={pullRefresh} data={users} />;
  const renderCustomer = () => <Tabs id='3' name='Customer' refreshing={refresh} pullRefresh={pullRefresh} data={users} />;

  const renderScene = SceneMap({
    admin: renderAdmin as any,
    staff: renderStaff as any,
    customer: renderCustomer as any,
  });

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
  const renderButtonAdd = () => (
    <TouchableOpacity
      style={styles.containerButton}
      onPress={() => {
        NavigationActionService.navigate(ADD_USER_SCREEN);
      }}>
      <Icon name="plus" size={20} />
    </TouchableOpacity>
  );

  return (
    <View style={globalStyle.container}>
      <SearchComponent />
      {renderBody()}
      {renderButtonAdd()}
    </View>
  );
};

export default UserManagerScreen;
