import { useRoute } from "@react-navigation/native";

const useServiceDetail = ()=>{
const route = useRoute();
const {value} = route.params as any;
return{
    value,
}
}

export default useServiceDetail;