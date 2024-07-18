import { StyleSheet } from "react-native";
import { InriaSerifBold } from "../../../constants/font";

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#52524D',
        width:'96%',
        height:'auto',
        padding:10,
        margin:14,
        alignSelf:'center',
        borderRadius:20
    },
    title:{
        fontSize:20,
        color:'#d4d3d6',
        fontFamily:InriaSerifBold,
        marginBottom:10
    },
    time:{
        alignSelf:'flex-end',
        margin:10,
        fontSize:12,
    },
    dot:{
        backgroundColor:'#C6C6BA',
        width:12,
        height:12,
        borderRadius:6,
        position:'absolute',
        right:15,
        top:20
    }
});

export default styles;