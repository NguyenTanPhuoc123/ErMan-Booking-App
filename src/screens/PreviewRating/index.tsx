import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import usePreviewRating from './usePreviewRating';
import styles from './style';
import {Header} from 'react-native-elements';
import globalStyle from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AirbnbRating} from 'react-native-ratings';

const textRating = ['Rất tệ', 'Tệ', 'Tốt', 'Hài lòng', 'Rất hài lòng'];
const PreviewRatingScreen = () => {
  const {
    goBack,
    rating,
    setRating,
    review,
    setReview,
    booking,
    confirmRating,
    rate,
    rated,
  } = usePreviewRating();

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
      <View>
        <Text style={styles.label}>
          Hãy cho chúng tôi biết về mức độ hài lòng của bạn về chất lượng phục
          vụ tại {booking.branch.branchName} của chúng tôi
        </Text>
        <AirbnbRating
          count={5}
          size={30}
          defaultRating={rate ? rate.rate:rating}
          isDisabled={rated}
          onFinishRating={setRating}
          showRating
          reviews={textRating}
          reviewSize={22}
        />
      </View>
    );
  };

  const renderReview = () => {
    return (
      <View>
        <Text style={styles.label}>
          Hãy cho biết nhận xét của bạn về chúng tôi
        </Text>
        <TextInput
          style={styles.input}
          value={rate ? rate.review : review}
          editable={!rated}
          selectTextOnFocus={!rated}
          onChangeText={setReview}
          placeholder="Viết nhận xét của bạn..."
          multiline
          maxLength={150}
        />
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      {renderRating()}
      {renderReview()}
      {rated ? null : (
        <TouchableOpacity style={styles.btn} onPress={confirmRating}>
          <Text style={styles.contentBtn}>Xác nhận</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PreviewRatingScreen;
