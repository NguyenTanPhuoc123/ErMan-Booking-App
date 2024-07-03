import { StyleSheet } from "react-native";
import { WITDH } from "../../../../../constants/styles";
import { InriaSerifBold } from "../../../../../constants/font";

const styles = StyleSheet.create({
container:{
    backgroundColor:'#433F3F',
    flexDirection:'row',
    width:WITDH-20,
    height:100,
    margin:10,
    borderRadius:20,
    alignItems:'center',
    
},
avatar:{
    width:75,
    height:75,
    borderRadius:40,
    marginRight:20,
    marginLeft:10
},
info:{
    fontSize:18,
    color:'#d4d3d6',
    fontFamily:InriaSerifBold
},
containerButton:{
    marginLeft: 10, 
    padding: 10
},
textIcon:{
    color: '#FF8572',
    fontWeight:'bold'
}

});

export default styles;