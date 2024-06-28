import { StyleSheet } from "react-native";
import { WITDH } from "../../constants/styles";
import { InriaSerifBold, InriaSerifRegular } from "../../constants/font";

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        width:WITDH/2,
        height:50,
        padding:10
    },
    selectedItem:{
        fontSize:16,
        fontFamily:InriaSerifBold,
        color:'#000'
    },
    textItem:{
        fontSize:16,
        fontFamily:InriaSerifRegular,
        color:'#000'
    }
})

export default styles;