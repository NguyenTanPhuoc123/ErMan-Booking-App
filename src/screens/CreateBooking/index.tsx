import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';
import styles from './style';
import globalStyle from '../../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useCreateBooking from './useCreateBooking';
import SelectService from './components/SelectService';
import SelectBranch from './components/SelectBranch';
import SelectStylistAndTime from './components/SelectStylistAndTime';
import {Staff} from '../../modules/user/model';
import {
  BOOKING_DETAIL_SCREEN,
  SELECT_PAYMENT_SCREEN,
} from '../../constants/screen_key';
import CustomDropDown from '../../component/CustomDropdown';
import NavigationActionService from '../../navigation/navigation';
import { ZALO_PAY } from '../../constants/icons';
type SectionListItem = {
  id: number;
  title: string;
  data: JSX.Element;
};

const CreateBookingScreen = () => {
  const {
    goBack,
    services,
    branch,
    stylists,
    stylist,
    setStylist,
    date,
    setDate,
    time,
    setTime,
    createBooking,
    screen,
    payments,
    payment,
    setPayment,
    booking,
    onPay,
    isPaid
  } = useCreateBooking();

  const data = [
    {
      id: 1,
      title: 'Chọn dịch vụ',
      data: (
        <SelectService disabled={booking ? true : false} services={services} />
      ),
    },
    {
      id: 2,
      title: 'Chọn chi nhánh',
      data: <SelectBranch listService={services} branch={branch} />,
    },
    {
      id: 3,
      title: 'Chọn stylist & thời gian',
      data: (
        <SelectStylistAndTime
          onSelectStylist={setStylist}
          bookingDate={date}
          onSelectBookingDate={setDate}
          bookingTime={time}
          onSelectBookingTime={setTime}
          stylist={stylist}
          services={services}
          stylists={stylists as Staff[]}
        />
      ),
    },
  ];

  const renderHeader = () => {
    return (
      <Header
        containerStyle={styles.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={[globalStyle.fontText, styles.titleHeader]}>
            Đặt lịch giữ chỗ
          </Text>
        }
        leftComponent={
          <TouchableOpacity onPress={goBack}>
            <Icon
              name="arrow-left"
              size={25}
              style={globalStyle.fontText}
              solid
            />
          </TouchableOpacity>
        }
      />
    );
  };

  const renderButtonBooking = () => (
    <TouchableOpacity style={styles.btnBooking} disabled={payment=='2' && !isPaid } onPress={createBooking}>
      <Text style={styles.contentBtnBooking}>
        {screen === BOOKING_DETAIL_SCREEN ? 'Thay đổi' : 'Lên lịch ngay'}
      </Text>
    </TouchableOpacity>
  );

  const renderPayment = () => {
    return (
      <View style={styles.payment}>
        <Text style={styles.label}>4. Phương thức thanh toán:</Text>
        <View style={{marginHorizontal: 20}}>
          <CustomDropDown
            data={payments}
            value={payment}
            valueField="id"
            label="name"
            onChange={setPayment}
          />
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <FlatList<SectionListItem>
        data={data}
        scrollEnabled={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return item.data;
        }}
      />
    );
  };

  const renderPay = () => {
    return (
      <View style={styles.billContainer}>
        <Text style={[globalStyle.fontText,{color:'red'}]}>*Lưu ý: Bạn phải thực hiện thanh toán thì mới có thể đặt lịch được.</Text>
        <TouchableOpacity style={styles.btnPay} onPress={onPay}>
          <Image source={ZALO_PAY} style={{width:30,height:30}} resizeMode='center'/>
          <Text style={styles.contentBtnBooking}>Thực hiện thanh toán</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <ScrollView>
        {renderBody()}
        {renderPayment()}
        {payment === '2' ? renderPay() : null}
        {renderButtonBooking()}
      </ScrollView>
    </View>
  );
};

export default CreateBookingScreen;
