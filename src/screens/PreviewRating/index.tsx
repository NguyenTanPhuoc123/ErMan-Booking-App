import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import usePreviewRating from './usePreviewRating';
import styles from './style';
import {Header} from 'react-native-elements';
import globalStyle from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Rating} from 'react-native-elements';

const PreviewRatingScreen = () => {
  const {goBack, rating, setRating} = usePreviewRating();

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={[globalStyle.fontText, styles.titleHeader]}>
            Đánh giá nhận xét
          </Text>
        }
        leftComponent={
          <TouchableOpacity onPress={goBack}>
            <Icon name="arrow-left" size={25} color={'#d4d3d6'} solid />
          </TouchableOpacity>
        }
      />
    );
  };

  const renderRating = () => {
    return (
      <View >
        <Text style={styles.label}>Hãy cho chúng tôi biết về mức độ hài lòng của bạn về chất lượng phục vụ của chúng tôi</Text>
        <Rating
          imageSize={40}
          startingValue={rating}
          onFinishRating={setRating}
          showReadonlyText
          showRating
          tintColor='#282828'
        />
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      {renderRating()}
    </View>
  );
};

export default PreviewRatingScreen;
