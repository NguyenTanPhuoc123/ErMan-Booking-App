import { createNavigationContainerRef, StackActions } from "@react-navigation/native";

const popAction = StackActions.pop(1);
export const navigationRef = createNavigationContainerRef<any>();

function navigate(screenName:string, passProps = {}){
    if(navigationRef.isReady()){
        navigationRef.navigate(screenName,passProps);
    }
}

function pop(){
    if(navigationRef.isReady()){
        navigationRef.dispatch(StackActions.pop());
    }
}

function popToRoot(){
    if(navigationRef.isReady()){
        navigationRef.dispatch(StackActions.popToTop());
    }
}

function reset(index:number,routes:any){
    if(navigationRef.isReady()){
        navigationRef.reset({index:index,routes:routes});
    }
}

function canGoBack() {
    if (navigationRef.isReady()) {
      return navigationRef.canGoBack();
    }
    return false;
}

const NavigationActionService = {
    navigate,
    pop,
    popToRoot,
    reset,
    canGoBack
};

export default NavigationActionService;