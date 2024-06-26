import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {CUSTOM_POPUP} from '../constants/screen_key';
import {PopupProps} from '../component/CustomPopup/type';
import {loadingRef} from '../AppContainer';

const popAction = StackActions.pop(1);
export const navigationRef = createNavigationContainerRef<any>();

function navigate(screenName: string, passProps = {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screenName, passProps);
  }
}

function pop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop());
  }
}

function popToRoot() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

function reset(index: number, routes: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset({index: index, routes: routes});
  }
}

function showPopup(props: PopupProps) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(CUSTOM_POPUP, {...props});
  }
}

function hidePopup() {
  if (navigationRef.isReady()) {
    const navigationState = navigationRef.getState();
    if (!!navigationState) {
      const {index, routes} = navigationState;
      const currentRoutes = routes[index].name;
      if (currentRoutes === CUSTOM_POPUP) {
        navigationRef.dispatch(popAction);
      }
    }
  }
}

function showLoading() {
  loadingRef.current && loadingRef.current.showLoading();
}

function hideLoading() {
  loadingRef.current && loadingRef.current.hideLoading();
}


const NavigationActionService = {
  navigate,
  pop,
  popToRoot,
  reset,
  showPopup,
  hidePopup,
  showLoading,
  hideLoading,
};

export default NavigationActionService;
