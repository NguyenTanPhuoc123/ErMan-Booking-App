import FastImage from 'react-native-fast-image';
import {View, Text} from 'react-native';
import styles from './style';
import {AVARTAR_DEFAULT_CUSTOMER} from '../../../../../constants/icons';
import {User} from '../../../../../modules/user/model';

const Item = (props: User) => {
  const {firstname, lastname, email, avatar} = props;
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.avatar}
        source={!avatar ? AVARTAR_DEFAULT_CUSTOMER : {uri: avatar}}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.info}>{firstname + ' ' + lastname}</Text>
        <Text style={styles.info}>Email: {email}</Text>
      </View>
    </View>
  );
};

export default Item;
