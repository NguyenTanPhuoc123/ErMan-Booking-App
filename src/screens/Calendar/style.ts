import { StyleSheet } from "react-native";
import { InriaSerifBold, InriaSerifRegular } from "../../constants/font";
import { WITDH } from "../../constants/styles";

const style=StyleSheet.create({
    containerHeader: {
        borderColor: '#433F3F',
        height: 100,
      },
      titleHeader: {
        fontSize: 22,
        marginHorizontal: 5,
        fontFamily: InriaSerifBold,
        color: '#D4D3D6',
      },
      statusBar:{
        backgroundColor:'#F3B20A',
        borderRadius:3,
        height:4,
        width:60,
        alignSelf:'center',
        marginLeft:WITDH * 0.05,
      },
      textTab :{
        color:'#fff',
        fontFamily:InriaSerifRegular,
        fontSize:14,
        textTransform:'none'
      },
      containerCategory:{
        flexDirection:'row'
      },
      conn:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        height:200,
        width:200
      }



})


export default style;