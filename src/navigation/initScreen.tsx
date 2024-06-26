import * as SCREEN_KEYS from '../constants/screen_key';
import {AdminStackParamList, AuthStackParamList, MainStackParamList} from './StackParamList';
import LandingPage from '../screens/Authentication/LandingPage';
import LoginScreen from '../screens/Authentication/Login';
import VerifyPhoneScreen from '../screens/Authentication/VerifyPhone';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../screens/Authentication/Register';
import InformationScreen from '../screens/Authentication/Information';
import ChangePasswordScreen from '../screens/Authentication/ChangePassword';
import HomeScreen from '../screens/Home';
import TabNavigator from './BottomTabNavigator';
import ServiceScreen from '../screens/Service';
import MessageScreen from '../screens/Message';
import PersonalScreen from '../screens/Personal';
import ProfileScreen from '../screens/Account/Profile';
import ServiceDetailScreen from '../screens/ServiceDetail';
import MyBookingScreen from '../screens/Booking';
import EditProfileScreen from '../screens/Account/EditProfile';
import UserManagerScreen from '../screens/Admin/UserManager';
import BranchScreen from '../screens/Branch';
import NotificationScreen from '../screens/Notifications';
import NewsScreen from '../screens/News';

export type AuthStackObject = {
  [key in keyof Partial<AuthStackParamList>]:
    | React.MemoExoticComponent<() => JSX.Element>
    | (() => JSX.Element);
};

export type MainStackObject = {
  [key in keyof Partial<MainStackParamList>]:
    | React.MemoExoticComponent<() => JSX.Element>
    | (() => JSX.Element);
};

export type AdminStackObject = {
  [key in keyof Partial<AdminStackParamList>]:
    | React.MemoExoticComponent<() => JSX.Element>
    | (() => JSX.Element);
};

type StackProps = {
  initialRouteName?: string;
};
export type BottomTabItem = {
  name: string;
  label: string;
  component: React.MemoExoticComponent<() => JSX.Element> | (() => JSX.Element);
  icon: string;
};
export const authStackScreens: AuthStackObject = {
  [SCREEN_KEYS.LOGIN_SCREEN]: LoginScreen,
  [SCREEN_KEYS.REGISTER_SCREEN]: RegisterScreen,
  [SCREEN_KEYS.VERIFY_PHONE_SCREEN]: VerifyPhoneScreen,
  [SCREEN_KEYS.INFORMATION_SCREEN]: InformationScreen,
  [SCREEN_KEYS.CHANGE_PASSWORD_SCREEN]: ChangePasswordScreen,
};

export const landingStackScreens: AuthStackObject = {
  [SCREEN_KEYS.LANDING_PAGE]: LandingPage,
  ...authStackScreens,
};

export const dashboardStackScreens: MainStackObject = {
  [SCREEN_KEYS.HOME_SCREEN]: HomeScreen,
  [SCREEN_KEYS.SERVICE_SCREEN]: ServiceScreen,
  [SCREEN_KEYS.MY_BOOKING_SCREEN]: MyBookingScreen,
  [SCREEN_KEYS.MESSAGE_SCREEN]: MessageScreen,
  [SCREEN_KEYS.PERSONAL_SCREEN]: PersonalScreen,
};
export const mainStackScreens: MainStackObject = {
  ...dashboardStackScreens,
  [SCREEN_KEYS.PROFILE_SCREEN]: ProfileScreen,
  [SCREEN_KEYS.EDIT_PROFILE_SCREEN]:EditProfileScreen,
  [SCREEN_KEYS.SERVICE_DETAIL_SCREEN]: ServiceDetailScreen,
  [SCREEN_KEYS.BRANCH_SCREEN]:BranchScreen,
  [SCREEN_KEYS.NOTIFICATION_SCREEN]:NotificationScreen,
  [SCREEN_KEYS.NEWS_SCREEN]:NewsScreen
};

export const adminStackScreens: AdminStackObject = {
  [SCREEN_KEYS.USER_MANAGER_SCREEN]: UserManagerScreen
}

const Stack = createStackNavigator();
export const AuthNavigator = ({initialRouteName}: StackProps) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      {Object.entries(landingStackScreens).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export const BottomTabStackNavigator = (initialRouteName: string) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}
      children={Object.entries(dashboardStackScreens).map(
        ([name, component]) => (
          <Stack.Screen key={name} name={name} component={component} />
        ),
      )}></Stack.Navigator>
  );
};

export const MainNavigator = ({initialRouteName}: StackProps) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      {Object.entries(mainStackScreens).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  );
};

export const AdminNavigator = ({initialRouteName}: StackProps) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      {Object.entries(adminStackScreens).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export const HomeBottomTabNavigator = () =>
  BottomTabStackNavigator(SCREEN_KEYS.HOME_SCREEN);
export const ServiceBottomTabNavigator = () =>
  BottomTabStackNavigator(SCREEN_KEYS.SERVICE_SCREEN);
export const BookingBottomTabNavigator = () =>
  BottomTabStackNavigator(SCREEN_KEYS.MY_BOOKING_SCREEN);
export const MessageBottomTabNavigator = () =>
  BottomTabStackNavigator(SCREEN_KEYS.MESSAGE_SCREEN);
export const PersonalBottomTabNavigator = () =>
  BottomTabStackNavigator(SCREEN_KEYS.PERSONAL_SCREEN);
export const BottomTabNavigator: BottomTabItem[] = [
  {
    name: SCREEN_KEYS.HOME_STACK,
    label: 'Trang chủ',
    component: HomeBottomTabNavigator,
    icon: 'home',
  },
  {
    name: SCREEN_KEYS.SERVICE_STACK,
    label: 'Dịch vụ',
    component: ServiceBottomTabNavigator,
    icon: 'cut',
  },
  {
    name: SCREEN_KEYS.MY_BOOKING_STACK,
    label: 'Lịch đặt',
    component: BookingBottomTabNavigator,
    icon: 'calendar-alt',
  },
  {
    name: SCREEN_KEYS.MESSAGE_STACK,
    label: 'Tin nhắn',
    component: MessageBottomTabNavigator,
    icon: 'facebook-messenger',
  },
  {
    name: SCREEN_KEYS.ACCOUNT_STACK,
    label: 'Cá nhân',
    component: PersonalBottomTabNavigator,
    icon: 'user',
  },
];
