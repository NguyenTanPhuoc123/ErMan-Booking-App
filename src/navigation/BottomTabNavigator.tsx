import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HOME_STACK} from '../constants/screen_key';
import {BottomTabNavigator} from './initScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import globalStyle from '../constants/styles';
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#433F3F',
          borderColor: '#433F3F',
          height: 70,
        },
      }}
      initialRouteName={HOME_STACK}
      children={BottomTabNavigator.map(({name,component, icon}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name={icon}
                solid
                size={25}
                color={focused ? '#FCB704' : '#D4D3D6'}
              />
            ),
          }}
        />
      ))}
    />
  );
};

export default TabNavigator;
