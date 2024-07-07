import { useRoute } from "@react-navigation/native";
import NavigationActionService from "../../navigation/navigation";

const useBookingDetail = ()=>{
    const {booking} = useRoute().params as any;

    const goBack = ()=>{
        NavigationActionService.pop();
    }
    return {booking,goBack};
}

export default useBookingDetail;