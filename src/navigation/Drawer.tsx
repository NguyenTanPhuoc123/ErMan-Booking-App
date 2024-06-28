import {createDrawerNavigator} from '@react-navigation/drawer';
import {DASHBOARD_STACK,} from '../constants/screen_key';
import {drawerStackNavigator} from './initScreen';
import globalStyle from '../constants/styles';
import {InriaSerifBold} from '../constants/font';
import CustomDrawer from '../component/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={DASHBOARD_STACK}
      screenOptions={{
        drawerActiveTintColor: globalStyle.colorYellowBold.color,
        drawerInactiveTintColor: '#d4d3d6',
        headerTintColor: '#d4d3d6',
        headerStyle: {backgroundColor: '#433F3F'},
        headerTitleStyle: {fontSize: 22, fontFamily: InriaSerifBold},
        drawerStyle: {
          backgroundColor: '#282828',
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      children={drawerStackNavigator.map(item => {
        return (
          <Drawer.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              drawerType: 'slide',
              drawerLabel: item.label,
              headerTitle: item.label,
              headerTitleAlign: 'center',
            }}
          />
        );
      })}
    />
  );
};

export default DrawerNavigator;
