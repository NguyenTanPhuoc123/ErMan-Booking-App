import { NOTIFICATION_SCREEN } from "../../constants/screen_key";
import NavigationActionService from "../../navigation/navigation";

const useNews = ()=>{
    const goBack = ()=>{
        NavigationActionService.pop();
    }

    const goToNotifcation = ()=>{
        NavigationActionService.navigate(NOTIFICATION_SCREEN);
    }
    return{goBack, goToNotifcation};
}

export default useNews;