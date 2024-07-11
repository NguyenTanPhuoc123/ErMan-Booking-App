import * as SCREEN_KEYS from '../constants/screen_key';
import {
  AdminStackParamList,
  AuthStackParamList,
  MainStackParamList,
} from './StackParamList';
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
import PersonalScreen from '../screens/Personal';
import ProfileScreen from '../screens/Account/Profile';
import ServiceDetailScreen from '../screens/ServiceDetail';
import MyBookingScreen from '../screens/Booking';
import EditProfileScreen from '../screens/Account/EditProfile';
import UserManagerScreen from '../screens/Admin/UserManager';
import BranchScreen from '../screens/Branch';
import NotificationScreen from '../screens/Notifications';
import ServiceManagerScreen from '../screens/Admin/ServiceManager';
import DrawerNavigator from './Drawer';
import DashboardScreen from '../screens/Admin/Dashboard';
import AddUsersScreen from '../screens/Admin/AddUsers';
import CalendarScreen from '../screens/Calendar';

import BranchDetailScreen from '../screens/BranchDetail';
import BranchManagerScreen from '../screens/Admin/BranchManagerScreen';
import StylistScreen from '../screens/Stylist';
import CreateBookingScreen from '../screens/CreateBooking';
import BookingDetailScreen from '../screens/BookingDetail';
import SelectPaymentScreen from '../screens/SelectPayment';
import PreviewRatingScreen from '../screens/PreviewRating';
import AddServiceScreen from '../screens/Admin/AddService';
import AddBranchScreen from '../screens/Admin/AddBranch';

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

export type DrawerItem = {
  name: string;
  label: string;
  component: React.MemoExoticComponent<() => JSX.Element> | (() => JSX.Element);
};

export const authStackScreens: AuthStackObject = {
  [SCREEN_KEYS.LOGIN_SCREEN]: LoginScreen,
  [SCREEN_KEYS.REGISTER_SCREEN]: RegisterScreen,
  [SCREEN_KEYS.INFORMATION_SCREEN]: InformationScreen,
};

export const landingStackScreens: AuthStackObject = {
  [SCREEN_KEYS.LANDING_PAGE]: LandingPage,
  ...authStackScreens,
};

export const dashboardStackScreens: MainStackObject = {
  [SCREEN_KEYS.HOME_SCREEN]: HomeScreen,
  [SCREEN_KEYS.SERVICE_SCREEN]: ServiceScreen,
  [SCREEN_KEYS.MY_BOOKING_SCREEN]: MyBookingScreen,
  [SCREEN_KEYS.PERSONAL_SCREEN]: PersonalScreen,
};
export const mainStackScreens: MainStackObject = {
  ...dashboardStackScreens,
  [SCREEN_KEYS.PROFILE_SCREEN]: ProfileScreen,
  [SCREEN_KEYS.EDIT_PROFILE_SCREEN]: EditProfileScreen,
  [SCREEN_KEYS.SERVICE_DETAIL_SCREEN]: ServiceDetailScreen,
  [SCREEN_KEYS.BRANCH_SCREEN]: BranchScreen,
  [SCREEN_KEYS.BRANCH_DETAIL_SCREEN]: BranchDetailScreen,
  [SCREEN_KEYS.NOTIFICATION_SCREEN]: NotificationScreen,
  [SCREEN_KEYS.CALENDAR_SCREEN]: CalendarScreen,
  [SCREEN_KEYS.CHANGE_PASSWORD_SCREEN]: ChangePasswordScreen,
  [SCREEN_KEYS.STYLIST_SCREEN]: StylistScreen,
  [SCREEN_KEYS.CREATE_BOOKING_SCREEN]: CreateBookingScreen,
  [SCREEN_KEYS.BOOKING_DETAIL_SCREEN]: BookingDetailScreen,
  [SCREEN_KEYS.SELECT_PAYMENT_SCREEN]: SelectPaymentScreen,
  [SCREEN_KEYS.PREVIEW_RATING_SCREEN]: PreviewRatingScreen,
};

export const drawerStackScreens: AdminStackObject = {
  [SCREEN_KEYS.DASHBOARD_SCREEN]: DashboardScreen,
  [SCREEN_KEYS.USER_MANAGER_SCREEN]: UserManagerScreen,
  [SCREEN_KEYS.SERVICE_MANAGER_SCREEN]: ServiceManagerScreen,
  [SCREEN_KEYS.PROFILE_SCREEN]: ProfileScreen,
  [SCREEN_KEYS.BRANCH_MANAGER_SCREEN]: BranchManagerScreen,
};

export const adminStackScreens: AdminStackObject = {
  ...drawerStackScreens,
  [SCREEN_KEYS.EDIT_PROFILE_SCREEN]: EditProfileScreen,
  [SCREEN_KEYS.ADD_USER_SCREEN]: AddUsersScreen,
  [SCREEN_KEYS.ADD_SERVICE_SCREEN]: AddServiceScreen,
  [SCREEN_KEYS.ADD_BRANCH_SCREEN]: AddBranchScreen,
};

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

export const DrawerStackNavigator = (initialRouteName: string) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}
      children={Object.entries(drawerStackScreens).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}></Stack.Navigator>
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
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Drawers"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      {Object.entries(adminStackScreens).map(([name, component]) => (
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

export const HomeBottomTabNavigator = () =>
  BottomTabStackNavigator(SCREEN_KEYS.HOME_SCREEN);
export const ServiceBottomTabNavigator = () =>
  BottomTabStackNavigator(SCREEN_KEYS.SERVICE_SCREEN);
export const BookingBottomTabNavigator = () =>
  BottomTabStackNavigator(SCREEN_KEYS.MY_BOOKING_SCREEN);
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
    name: SCREEN_KEYS.ACCOUNT_STACK,
    label: 'Cá nhân',
    component: PersonalBottomTabNavigator,
    icon: 'user',
  },
];

export const UserDrawerNavigator = () =>
  DrawerStackNavigator(SCREEN_KEYS.USER_MANAGER_SCREEN);
export const ServiceDrawerNavigator = () =>
  DrawerStackNavigator(SCREEN_KEYS.SERVICE_MANAGER_SCREEN);
export const DashboardDrawerNavigator = () =>
  DrawerStackNavigator(SCREEN_KEYS.HOME_SCREEN);
export const ProfileDrawerNavigator = () =>
  DrawerStackNavigator(SCREEN_KEYS.PROFILE_SCREEN);
export const BranchDrawerNavigator = () =>
  DrawerStackNavigator(SCREEN_KEYS.BRANCH_MANAGER_SCREEN);

export const drawerStackNavigator: DrawerItem[] = [
  {
    name: SCREEN_KEYS.DASHBOARD_STACK,
    label: 'Bảng điều khiển',
    component: DashboardDrawerNavigator,
  },
  {
    name: SCREEN_KEYS.USER_MANAGER_STACK,
    label: 'Quản lý người dùng',
    component: UserDrawerNavigator,
  },
  {
    name: SCREEN_KEYS.SERVICE_MANAGER_STACK,
    label: 'Quản lý dịch vụ',
    component: ServiceDrawerNavigator,
  },
  {
    name: SCREEN_KEYS.PROFILE_STACK,
    label: 'Thông tin cá nhân',
    component: ProfileDrawerNavigator,
  },
  {
    name: SCREEN_KEYS.BRANCH_MANAGER_STACK,
    label: 'Quản lý chi nhánh',
    component: BranchDrawerNavigator,
  },
];
