import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {createRef, useCallback, useEffect, useState} from 'react';
import globalStyle, {WITDH} from '../../constants/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {IAuthState} from '../../modules/auth/model';
import {Header} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import styles from './style';
import {
  AVARTAR_DEFAULT_CUSTOMER,
  AVARTAR_DEFAULT_STAFF,
  BRANCH,
  CUSTOMER,
  SERVICE_CUT_HAIR,
  STYLELIST,
} from '../../constants/icons';
import {APP_TYPE} from '../../constants/app_info';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchComponent from './components/Search';
import SaleComponent from './components/Sales';
import DiscountCarousel, {
  ICarouselInstance,
} from 'react-native-reanimated-carousel';
import Dots from 'react-native-dots-pagination';
import ItemServiceRow from './components/ItemServiceRow';
import ButtonComponent from './components/ButtonComponent';
import ItemNewsRow from './components/ItemNewsRow';
import ItemBranchRow from './components/ItemBranchRow';
import ItemStylistRow from './components/ItemStylistRow';
import BookingNear from './components/BookingNear';
import NavigationActionService from '../../navigation/navigation';
import { HOME_SCREEN, SERVICE_SCREEN } from '../../constants/screen_key';
import useDasboard from './useDashboard';
import { Service } from '../../modules/service/model';
const Sale = [
  {
    code: 'ERMAN16',
    content: 'Tất cả các dịch vụ tại Erman Salon từ 1/7 - 2/7',
    discountPercent: 50,
  },
  {
    code: 'ERMAN17',
    content: 'Tất cả các dịch vụ tại Erman Salon từ 3/7 - 4/7',
    discountPercent: 60,
  },
  {
    code: 'ERMAN18',
    content: 'Tất cả các dịch vụ tại Erman Salon từ 5/7 - 6/7',
    discountPercent: 70,
  },
];

const dataNews = [
  {
    image: SERVICE_CUT_HAIR,
    title: 'Làm thế nào để không bị rụng tóc?',
  },
  {
    image: SERVICE_CUT_HAIR,
    title: 'Làm thế nào để không bị rụng tóc?',
  },
  {
    image: SERVICE_CUT_HAIR,
    title: 'Làm thế nào để không bị rụng tóc?',
  },
  {
    image: SERVICE_CUT_HAIR,
    title: 'Làm thế nào để không bị rụng tóc?',
  },
  {
    image: SERVICE_CUT_HAIR,
    title: 'Làm thế nào để không bị rụng tóc?',
  },
];

const dataBranch = [
  {
    image: BRANCH,
    branchName: 'Erman Quận 7',
    rate: 5,
    address: '96A Lý Phục Man, phường Bình Thuận, quận 7, TP.HCM',
    distance: 1000,
    status: true,
  },
  {
    image: BRANCH,
    branchName: 'Erman Bến Tre',
    rate: 4,
    address: 'ấp Long Phú, xã Long Định, huyện Bình Đại, Bến Tre',
    distance: 500,
    status: false,
  },
  {
    image: BRANCH,
    branchName: 'Erman Quận 7',
    rate: 2,
    address: '96A Lý Phục Man, phường Bình Thuận, quận 7, TP.HCM',
    distance: 100,
    status: true,
  },
  {
    image: BRANCH,
    branchName: 'Erman Quận Tân Bình',
    rate: 1,
    address: '15 Thép Mới, phường 12, quận Tân Bình, TP.HCM',
    distance: 1000,
    status: false,
  },
];

const dataStylist = [
  {
    image: STYLELIST,
    fullname: 'Nguyễn Thanh Sang',
    rate: 5,
    address: '96A Lý Phục Man, phường Bình Thuận, quận 7, TP.HCM',
  },
  {
    image: STYLELIST,
    fullname: 'Nguyễn Thanh Sang',
    rate: 4,
    address: 'ấp Long Phú, xã Long Định, huyện Bình Đại, Bến Tre',
  },
  {
    image: STYLELIST,
    fullname: 'Nguyễn Thanh Sang',
    rate: 2,
    address: '96A Lý Phục Man, phường Bình Thuận, quận 7, TP.HCM',
  },
  {
    image: STYLELIST,
    fullname: 'Nguyễn Thanh Sang',
    rate: 1,
    address: '15 Thép Mới, phường 12, quận Tân Bình, TP.HCM',
  },
];
const HomeScreen = () => {
  const {services,currentUser} = useDasboard();
  const discountRef = createRef<ICarouselInstance>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const serviceListRef = createRef<FlatList>();
  const newsListRef = createRef<FlatList>();
  const branchListRef = createRef<FlatList>();
  const stylistListRef = createRef<FlatList>();
  const [refresh, setRefresh] = useState(false);
  const pullRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, []);
  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        leftComponent={
          <View style={styles.leftComponentHeader}>
            <FastImage
              style={styles.avatar}
              resizeMode="cover"
              source={
                currentUser.avatar
                  ? {uri: currentUser.avatar}
                  : APP_TYPE === 'Customer'
                  ? AVARTAR_DEFAULT_CUSTOMER
                  : AVARTAR_DEFAULT_STAFF
              }
            />
            <View>
              <Text style={styles.textHeader}>Xin chào,</Text>
              <Text style={styles.textHeader}>{currentUser.lastname}</Text>
            </View>
          </View>
        }
        rightContainerStyle={styles.rightComponentHeader}
        rightComponent={
          <TouchableOpacity>
            <View>
              <View style={styles.pointNotification}></View>
              <Icon name="bell" style={globalStyle.fontText} size={25} solid />
            </View>
          </TouchableOpacity>
        }
      />
    );
  };

  const renderButtonComponent = () => {
    return (
      <View style={styles.buttonComponent}>
        {APP_TYPE != 'Customer' ? (
          <ButtonComponent
            icon="calendar-alt"
            title="Lịch làm việc"
            onPress={() => {}}
          />
        ) : (
          <ButtonComponent
            icon="newspaper"
            title="Tin tức"
            onPress={() => {}}
          />
        )}
        <ButtonComponent icon="store" title="Chi nhánh" onPress={() => {}} />
      </View>
    );
  };

  const renderSlideDiscount = () => {
    return (
      <View>
        <DiscountCarousel
          ref={discountRef}
          loop
          autoPlay={true}
          data={Sale}
          onSnapToItem={index => setCurrentIndex(index)}
          width={WITDH - 30}
          height={200}
          scrollAnimationDuration={2000}
          pagingEnabled={true}
          style={styles.slideDiscount}
          renderItem={({item}) => (
            <SaleComponent
              code={item.code}
              content={item.content}
              discountPercent={item.discountPercent}
            />
          )}
        />
        <View style={styles.dotContainer}>
          <Dots
            length={Sale.length}
            active={currentIndex}
            activeColor="#EEB156"
            passiveColor="#D4D3D6"
            alignDotsOnXAxis
          />
        </View>
      </View>
    );
  };

  const renderService = () => (
    <View style={styles.containerList}>
      <View style={styles.lineTitle}>
        <Text style={[globalStyle.fontText, styles.titleList]}>Dịch vụ</Text>
        <TouchableOpacity onPress={()=>NavigationActionService.navigate(SERVICE_SCREEN,{screen:HOME_SCREEN})}>
          <Text style={[globalStyle.fontText, styles.txtViewMore]}>
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList<Service>
        ref={serviceListRef}
        data={services}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item, index}) => (
          <ItemServiceRow
            key={item.id}
            {...item}
          />
        )}
      />
    </View>
  );

  const renderNews = () => (
    <View style={styles.containerList}>
      <View style={styles.lineTitle}>
        <Text style={[globalStyle.fontText, styles.titleList]}>Tin tức</Text>
        <TouchableOpacity>
          <Text style={[globalStyle.fontText, styles.txtViewMore]}>
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={newsListRef}
        data={dataNews}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item, index}) => (
          <ItemNewsRow key={index} image={item.image} title={item.title} />
        )}
      />
    </View>
  );

  const renderBranch = () => (
    <View style={styles.containerList}>
      <View style={styles.lineTitle}>
        <Text style={[globalStyle.fontText, styles.titleList]}>Chi nhánh</Text>
        <TouchableOpacity>
          <Text style={[globalStyle.fontText, styles.txtViewMore]}>
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={branchListRef}
        data={dataBranch}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item, index}) => (
          <ItemBranchRow
            key={index}
            image={item.image}
            branchName={item.branchName}
            distance={item.distance}
            rate={item.rate}
            address={item.address}
            status={item.status}
          />
        )}
      />
    </View>
  );

  const renderStylist = () => (
    <View style={styles.containerList}>
      <View style={styles.lineTitle}>
        <Text style={[globalStyle.fontText, styles.titleList]}>Stylist</Text>
        <TouchableOpacity>
          <Text style={[globalStyle.fontText, styles.txtViewMore]}>
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={stylistListRef}
        data={dataStylist}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item, index}) => (
          <ItemStylistRow
            key={index}
            image={item.image}
            fullname={item.fullname}
            rate={item.rate}
            address={item.address}
          />
        )}
      />
    </View>
  );

  const renderBookingNear = () => (
    <View style={styles.containerList}>
      <View style={styles.lineTitle}>
        <Text style={[globalStyle.fontText, styles.titleList]}>
          Lịch đặt sắp đến
        </Text>
        <TouchableOpacity>
          <Text style={[globalStyle.fontText, styles.txtViewMore]}>
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      <BookingNear />
    </View>
  );
  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={pullRefresh} refreshing={refresh} />
        }>
        {renderButtonComponent()}
        <SearchComponent />
        {renderSlideDiscount()}
        {APP_TYPE === 'Staff' ? renderBookingNear() : <></>}
        {renderService()}
        {renderNews()}
        {renderBranch()}
        {renderStylist()}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
