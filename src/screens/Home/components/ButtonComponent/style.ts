import { StyleSheet } from "react-native";
import { WITDH } from "../../../../constants/styles";


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#6740A5',
        width:WITDH/3 + 30,
        height:55,
        flexDirection:'row',
        margin:10,
        alignItems:'center',
        justifyContent:'space-evenly',
        borderRadius:20
    },
    title:{
        fontSize:16,
        color:'#fff',
    }
});

export default styles;