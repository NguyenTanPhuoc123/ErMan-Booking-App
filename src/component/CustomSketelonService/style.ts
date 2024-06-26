import { StyleSheet } from "react-native";
import { InriaSerifBold } from "../../constants/font";
import { WITDH } from "../../constants/styles";

const styles = StyleSheet.create({
    container: {
        width: WITDH / 2 - 20,
        height: 'auto',
        backgroundColor:'#474444',
        borderRadius: 20,
        margin: 10,
      },
      img: {
        width: '100%',
        height: 100,
        borderRadius: 20,
      },
      title: {
        fontSize: 16,
        textAlign: 'center',
        margin: 3,
        fontFamily: InriaSerifBold,
      },
      price: {
        fontSize: 17,
        fontFamily: InriaSerifBold,
        marginHorizontal: 10,
      },
      time:{
        marginHorizontal:10,
        marginTop:3
      },
      bookNow: {
        backgroundColor: '#EEB156',
        padding: 7,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      contentBtn: {
        color: '#433F3F',
        fontSize: 16,
      },
      discount:{
        backgroundColor:'#F3B20A',
        width:50,
        height:60,
        justifyContent:'center',
        borderTopRightRadius:20,
        alignItems:'center',
        position:'absolute',
        right:0
      },
      textDiscount:{
        color:'red',
        fontSize:16,
        fontFamily:InriaSerifBold,
        textAlign:'center'
      }
});

export default styles;