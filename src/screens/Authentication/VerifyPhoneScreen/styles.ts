import { StyleSheet } from "react-native";
import { WITDH } from "../../../constants/styles";

const styles = StyleSheet.create({
    containerHeader:{
        backgroundColor: '#282828',
        height:100,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#282828'
    },
    title:{
        color:'#B689FF',
        fontSize: 36,
        fontFamily:'InriaSerif-Bold',
        marginTop:40
    },
    subtitle:{
        fontSize:16,
        textAlign:'center',
        width: WITDH/1.4,
        margin:40
    },
    lineResendOtp:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:WITDH/1.2,
        margin:30,
    },
    resendOtp:{
        color:'#B689FF',
    },
    resendOtpDisable:{
        color:'#9D9696',
    },
    btnConfirm:{
        backgroundColor:'#6740A5',
        width:200,
        height:66,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginTop:50
    },
    contentBtnConfirm:{
        fontSize:24,
        color:'#FFF',

    }
});

export default styles;