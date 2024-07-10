import { StyleSheet } from "react-native";
import { HEIGHT } from "../../constants/styles";
import { InriaSerifBold } from "../../constants/font";

const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor:'#433F3',
        height:HEIGHT/4 - 50,
        justifyContent:'center',
        alignItems:'center'
    },
    avatar:{
        width:100,
        height:100,
        borderRadius:50,
        alignSelf:'center',
    },
    name:{
        fontSize:22,
        fontFamily:InriaSerifBold,
        color:'#d4d3d6',
        margin:10
    },
    containerbutton:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        margin:10
      },
      button:{
        marginTop:10
      }
});

export default styles;