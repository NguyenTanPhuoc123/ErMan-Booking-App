import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {
  SLIDE_WELCOME_1,
  SLIDE_WELCOME_2,
  SLIDE_WELCOME_3,
} from '../../../constants/icons';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {LOGIN_SCREEN} from '../../../constants/screen_key';
import {APP_NAME} from '../../../constants/app_info';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import globalStyle, {HEIGHT, WITDH} from '../../../constants/styles';
import NavigationActionService from '../../../navigation/navigation';
const data: WelcomeData[] = [
  {
    id: '1',
    content:
      'Khám phá nơi tỏa sáng vẻ đẹp đích thực của bạn! Tại Erman Salon, chúng tôi mang đến trải nghiệm làm đẹp hoàn hảo từ những chuyên gia hàng đầu',
    image: SLIDE_WELCOME_1,
  },
  {
    id: '2',
    content:
      'Tận hưởng các dịch vụ làm đẹp đẳng cấp từ chăm sóc tóc,  đến spa thư giãn. Mỗi dịch vụ đều được thực hiện bởi đội ngũ chuyên nghiệp và tận tâm.',
    image: SLIDE_WELCOME_2,
  },
  {
    id: '3',
    content:
      'Chỉ với vài thao tác đơn giản, bạn có thể đặt lịch hẹn với chúng tôi mọi lúc, mọi nơi. Trải nghiệm sự tiện lợi và nhanh chóng.',
    image: SLIDE_WELCOME_3,
  },
];

const WelcomeScreen = () => {
  const carouselRef = useRef<ICarouselInstance>();
  const handleNavigation = (index: number) => {
    carouselRef.current?.next();
    if (index === data.length - 1)
      NavigationActionService.navigate(LOGIN_SCREEN);
  };
  const renderItem = ({item, index}: {item: WelcomeData; index: number}) => {
    return (
      <ImageBackground
        style={styles.container}
        source={item.image as any}
        resizeMode="cover">
        {index !== 0 ? (
          <></>
        ) : (
          <Text style={styles.titlePage}>Chào mừng đến với {APP_NAME}!</Text>
        )}
        <Text
          style={[
            globalStyle.fontText,
            index === 0
              ? styles.subtitlePage1
              : index === 1
              ? styles.subtitlePage2
              : styles.subtitlePage3,
          ]}>
          {item.content}
        </Text>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => handleNavigation(index)}>
          {index === data.length - 1 ? (
            <Text style={styles.titleBtn}>BẮT ĐẦU</Text>
          ) : (
            <View style={styles.next}>
              <Text style={styles.titleBtn}>TIẾP TỤC</Text>
              <Icon style={styles.titleBtn} name="arrow-right"></Icon>
            </View>
          )}
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  return (
    <Carousel<WelcomeData>
      ref={carouselRef as any}
      data={data}
      renderItem={renderItem}
      width={WITDH}
      height={HEIGHT}
      loop={false}
      enabled={false}
    />
  );
};

export default WelcomeScreen;
