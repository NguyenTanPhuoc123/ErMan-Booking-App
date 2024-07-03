import { StyleSheet } from "react-native";
import { InriaSerifBold } from "../../constants/font";
import { WITDH } from "../../constants/styles";

const styles = StyleSheet.create({
    container: {
        width: WITDH / 2 - 20,
        height: 'auto',
        borderRadius: 20,
        margin: 10,
        backgroundColor:'rgba(98, 97, 94,0.5)',
        zIndex:999999999999
      },
      
});

export default styles;