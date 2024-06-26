import NavigationActionService from "../../navigation/navigation"

const useNotification = ()=>{
    const goBack = ()=>{
        NavigationActionService.pop();
    }
    return{
        goBack
    }
}

export default useNotification;