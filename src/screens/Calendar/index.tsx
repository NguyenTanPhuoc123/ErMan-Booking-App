import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import style from './style';
import globalStyle, {WITDH} from '../../constants/styles';
import {Header, Tab} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Tabs from './components/Tabs';
import useCalendar from './useCalendar';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const renderJanuary = () => <Tabs name="January" id="1" />;
const renderFebruary = () => <Tabs name="February" id="2" />;
const renderMarch = () => <Tabs name="March" id="3" />;
const renderApril = () => <Tabs name="April" id="4" />;
const renderMay = () => <Tabs name="May" id="5" />;
const renderJune = () => <Tabs name="June" id="6" />;
const renderJuly = () => <Tabs name="July" id="7" />;
const renderAugust = () => <Tabs name="August" id="8" />;
const renderSeptember = () => <Tabs name="September" id="9" />;
const renderOctober = () => <Tabs name="October" id="10" />;
const renderNovember = () => <Tabs name="November" id="11" />;
const renderDecember = () => <Tabs name="December" id="12" />;

const renderScene = SceneMap({
  january: renderJanuary as any,
  february: renderFebruary as any,
  march: renderMarch as any,
  // april: renderApril as any,
  // may: renderMay as any,
  // june: renderJune as any,
  // july: renderJuly as any,
  // august: renderAugust as any,
  // september: renderSeptember as any,
  // october: renderOctober as any,
  // november: renderNovember as any,
  // december: renderDecember as any,
});

const CalendarScreen = () => {
  const {
    index,
    setIndex,
    routes,
    category,
    open,
    openPicker,
    closePicker,
    formatStringDate,
    goBack
  } = useCalendar();
  const [date, setDate] = useState(new Date());
  const handleDateChange = selectedDate => {
    setDate(new Date(selectedDate)); // Chuyển đổi selectedDate thành đối tượng Date
    closePicker(); // Đóng DatePicker sau khi chọn ngày tháng
  };
  const renderHeader = () => {
    return (
      <Header
        containerStyle={style.containerHeader}
        backgroundColor="#433F3F"
        centerComponent={
          <Text style={style.titleHeader}>
            {moment(date).format('MM,YYYY')}
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
        rightComponent={
          <>
            <TouchableOpacity onPress={() => openPicker()}>
              <Icon
                name="calendar-alt"
                size={25}
                style={globalStyle.fontText}
                solid
              />
            </TouchableOpacity>
            <DatePicker
              //date={new Date(formatStringDate(value))}
              date={date}
              mode="date"
              modal
              title="Chọn ngày sinh"
              buttonColor="black"
              confirmText="Xác nhận"
              cancelText="Hủy"
              dividerColor="#000000"
              // onConfirm={date => {
              //   (moment(date).format('DD-MM-YYYY'));
              //   closePicker();
              // }}
              onConfirm={handleDateChange}
              //onCancel={() => closePicker()}
              onCancel={closePicker}
              open={open}
            />
          </>
        }
      />
    );
  };

  const renderBody = () => (
    <Tab
      style={style.containerCategory}
      value={index}
      onChange={setIndex}
      indicatorStyle={globalStyle.bgTransparent}>
      {category.map(item => {
        return (
          <Tab.Item
            containerStyle={globalStyle.container}
            titleStyle={globalStyle.fontText}
            key={item.id}
            title={item.name}
          />
        );
      })}
    </Tab>

    // <TabView
    //   overScrollMode="always"
    //   navigationState={{index, routes}}
    //   renderScene={renderScene}
    //   onIndexChange={setIndex}
    //   initialLayout={{width: WITDH}}
    //   renderTabBar={props => (
    //     <TabBar
    //       {...props}
    //       indicatorStyle={style.statusBar}
    //       style={{backgroundColor: '#282828'}}
    //       labelStyle={style.textTab}
    //       activeColor="#F3B20A"
    //       inactiveColor="#D4D3D6"
    //       pressColor="rgba(255, 255, 255, 0.5)"
    //       pressOpacity={0.8}
    //     />
    //   )}
    // />
  );

  return <View style={globalStyle.container}>{renderHeader()}</View>;
};

export default CalendarScreen;
