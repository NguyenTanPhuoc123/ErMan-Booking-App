import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
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
import {BOOKING_DETAIL_SCREEN} from '../../constants/screen_key';

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
  } = useCreateBooking();

  const data = [
    {id: 1, title: 'Chọn dịch vụ', data: <SelectService services={services} />},
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
    <TouchableOpacity style={styles.btnBooking} onPress={createBooking}>
      <Text style={styles.contentBtnBooking}>
        {screen === BOOKING_DETAIL_SCREEN ? 'Thay đổi' : 'Tiếp tục'}
      </Text>
    </TouchableOpacity>
  );

  const renderPayment = ()=>{
    return (
      <View>
        
      </View>
    )
  }

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

  return (
    <View style={globalStyle.container}>
      {renderHeader()}
      <ScrollView>
        {renderBody()}
        {renderButtonBooking()}
        {renderPayment()}
      </ScrollView>
    </View>
  );
};

export default CreateBookingScreen;
