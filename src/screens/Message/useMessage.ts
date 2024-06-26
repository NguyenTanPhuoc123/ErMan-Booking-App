import { NOTIFICATION_SCREEN } from "../../constants/screen_key";
import NavigationActionService from "../../navigation/navigation";

const useMessage = ()=>{
    const goToNotifcation = () => {
        NavigationActionService.navigate(NOTIFICATION_SCREEN);
    }
    return{goToNotifcation};
}

export default useMessage;